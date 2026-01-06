import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isPersonalRoute = req.nextUrl.pathname.startsWith('/personal')
  
  // Protect /personal routes (except /personal itself which is the login page)
  if (isPersonalRoute && req.nextUrl.pathname !== '/personal' && !isLoggedIn) {
    return Response.redirect(new URL('/personal', req.nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}




