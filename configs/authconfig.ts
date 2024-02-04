import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnProfile = nextUrl.pathname.startsWith('/profile')
      // const isOnLogin = nextUrl.pathname.startsWith('/auth')
      // if (isOnLogin) {
      //   if (isLoggedIn) return Response.redirect(new URL('/', nextUrl))
      // } else
      if (isOnDashboard || isOnProfile) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
