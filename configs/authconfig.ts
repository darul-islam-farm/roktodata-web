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
      const {
        isLoggedIn,
        isAdmin,
        isModerator,
        isDonor,
        isReceiver,
        isOnDonorDashboard,
        isOnReceiverDashboard,
        isOnAdminDashboard,
        isOnModDashboard,
        isOnProtected
        // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useAuthStatus(auth, nextUrl)

      // const isOnLogin = nextUrl.pathname.startsWith('/auth')
      // if (isOnLogin) {
      //   if (isLoggedIn) return Response.redirect(new URL('/', nextUrl))
      // } else
      if (isOnAdminDashboard) return isAdmin
      if (isOnModDashboard) return isModerator
      if (isOnDonorDashboard) return isDonor
      if (isOnReceiverDashboard) return isReceiver
      if (isOnProtected) return isLoggedIn

      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
