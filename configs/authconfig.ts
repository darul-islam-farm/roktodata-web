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
        isAdmin,
        isOnAdminDashboard,
        isModerator,
        isOnModDashboard
        // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useAuthStatus(auth, nextUrl)
      if (isOnAdminDashboard) return isAdmin
      if (isOnModDashboard) return isModerator

      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
