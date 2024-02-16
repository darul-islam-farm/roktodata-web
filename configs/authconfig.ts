import useAuthStatus from '@/helper/useAuthStatus'
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
      // const {
      //   isLoggedIn,
      //   isOnProtected
      //   // eslint-disable-next-line react-hooks/rules-of-hooks
      // } = useAuthStatus(auth, nextUrl)

      // if (isOnLogin) {
      //   if (isLoggedIn) return Response.redirect(new URL('/', nextUrl))
      // } else
      // if (isOnProtected) return isLoggedIn

      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
