import { NextURL } from 'next/dist/server/web/next-url'
import { Session } from 'next-auth/types'

export default function useAuthStatus(auth: Session | null, nextUrl: NextURL) {
  const isLoggedIn = !!auth?.user
  const isAdmin = auth?.user.role === 'ADMIN'
  const isModerator = auth?.user.role === 'MODERATOR'
  const isDonor = auth?.user.role === 'DONOR'
  const isReceiver = auth?.user.role === 'RECEIVER'
  const isOnAdminDashboard = nextUrl.pathname.startsWith('/admin')
  const isOnModDashboard = nextUrl.pathname.startsWith('/moderator')
  const isOnDonorDashboard = nextUrl.pathname.startsWith('/dashboard/donor')
  const isOnReceiverDashboard = nextUrl.pathname.startsWith(
    '/dashboard/receiver'
  )
  const isOnProtected = nextUrl.pathname.startsWith('/application')

  return {
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
  }
}
