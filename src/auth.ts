import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

/** Refresh a few minutes before Google revokes the access token (typ. ~1h). */
const ACCESS_TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            // Google Fit scopes for health data
            'https://www.googleapis.com/auth/fitness.activity.read',
            'https://www.googleapis.com/auth/fitness.sleep.read',
            'https://www.googleapis.com/auth/fitness.heart_rate.read',
          ].join(' '),
          access_type: 'offline', // Get refresh token
          // consent: ensure refresh token / scopes; select_account: always show Google account picker
          // (otherwise Google often reuses the browser’s default session, e.g. personal Gmail)
          prompt: 'consent select_account',
        },
      },
    }),
  ],
  pages: {
    signIn: '/personal',
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      // Initial sign in
      if (account?.provider === 'google' && user?.email) {
        const primaryEmail = user.email.trim()
        try {
          const { mergeLegacyTimelineSourcesIntoPrimaryEmail } = await import(
            '@/lib/timelineUserReassign'
          )
          const profileEmail =
            profile &&
            typeof profile === 'object' &&
            'email' in profile &&
            typeof (profile as { email?: unknown }).email === 'string'
              ? (profile as { email: string }).email
              : undefined
          await mergeLegacyTimelineSourcesIntoPrimaryEmail({
            primaryEmail,
            userEmail: user.email,
            profileEmail,
          })
        } catch (e) {
          console.error('Timeline legacy merge on Google sign-in failed:', e)
        }

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000,
          dbUserId: primaryEmail,
          error: undefined,
        }
      }

      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000,
          error: undefined,
        }
      }

      // Still valid (with buffer): reuse JWT without calling Google's token endpoint
      const expiresAt = token.accessTokenExpires as number | undefined
      if (
        token.accessToken &&
        expiresAt &&
        Date.now() < expiresAt - ACCESS_TOKEN_REFRESH_BUFFER_MS
      ) {
        return token
      }

      // Expired / near expiry / missing access: refresh (or mark needs re-login)
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      const db = token.dbUserId as string | undefined
      session.dbUserId = db?.trim() || session.user?.email || undefined

      if (token.error) {
        session.error = token.error as string
      } else {
        session.error = undefined
      }

      // Never hand a stale access token to the client after refresh failure
      if (token.error === 'RefreshAccessTokenError') {
        session.accessToken = undefined
      } else if (token.accessToken) {
        session.accessToken = token.accessToken as string
      } else {
        session.accessToken = undefined
      }
      return session
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})

/**
 * Exchange refresh token for a new access token.
 * On failure, strips credentials so we never keep using an expired access token.
 */
async function refreshAccessToken(token: Record<string, unknown>) {
  const refreshToken = token.refreshToken as string | undefined
  if (!refreshToken) {
    console.error('❌ No refresh_token on JWT; Google Fit needs a new sign-in')
    return {
      ...token,
      accessToken: undefined,
      refreshToken: undefined,
      accessTokenExpires: undefined,
      error: 'RefreshAccessTokenError',
    }
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })

    const refreshed = (await response.json()) as {
      access_token?: string
      expires_in?: number
      refresh_token?: string
      error?: string
    }

    if (!response.ok) {
      const revoke = refreshed.error === 'invalid_grant'
      console.error('❌ Google token refresh HTTP error:', response.status, refreshed)
      return {
        ...token,
        accessToken: undefined,
        refreshToken: revoke ? undefined : refreshToken,
        accessTokenExpires: undefined,
        error: 'RefreshAccessTokenError',
      }
    }

    if (!refreshed.access_token || typeof refreshed.expires_in !== 'number') {
      console.error('❌ Google token refresh: missing access_token or expires_in', refreshed)
      return {
        ...token,
        accessToken: undefined,
        accessTokenExpires: undefined,
        error: 'RefreshAccessTokenError',
      }
    }

    console.log('✅ Access token refreshed successfully')

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? refreshToken,
      error: undefined,
    }
  } catch (error) {
    console.error('❌ Error refreshing access token (network?):', error)
    // Keep refresh_token so a later retry after connectivity returns may succeed
    return {
      ...token,
      accessToken: undefined,
      accessTokenExpires: undefined,
      error: 'RefreshAccessTokenError',
    }
  }
}
