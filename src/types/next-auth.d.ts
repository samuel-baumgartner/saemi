import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
    /** Primary Google email — canonical Prisma `userId` for timeline data. */
    dbUserId?: string
    user: {
      id?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
    /** Same as Session.dbUserId — kept on the JWT across refresh. */
    dbUserId?: string
  }
}



