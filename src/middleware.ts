import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const path = req.nextUrl.pathname
  const isPersonalRoute = path.startsWith('/personal')
  const isInfoRoute = path.startsWith('/info')

  if (isPersonalRoute && path !== '/personal' && !isLoggedIn) {
    return Response.redirect(new URL('/personal', req.nextUrl))
  }

  if (isInfoRoute && !isLoggedIn) {
    return Response.redirect(new URL('/personal', req.nextUrl))
  }
})

export const config = {
  // Only routes that need auth redirects — avoids edge middleware on /, assets, etc.
  matcher: ['/personal', '/personal/:path*', '/info', '/info/:path*'],
}
