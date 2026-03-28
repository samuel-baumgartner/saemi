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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|data/).*)'],
}
