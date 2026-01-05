import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

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
          prompt: 'consent', // Force consent screen to get all scopes
        },
      },
    }),
  ],
  pages: {
    signIn: '/personal',
  },
  callbacks: {
    async jwt({ token, account }) {
      // Save access token for Google Fit API calls
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Make access token available in session
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})

