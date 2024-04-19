import { NextURL } from 'next/dist/server/web/next-url'
import { Session } from 'next-auth/types'

export default function useAuthStatus(auth: Session | null, nextUrl: NextURL) {
  const isLoggedIn = !!auth?.user
  const isAdmin = auth?.user.email.includes('@roktodata.com')
  const isModerator = auth?.user.email.includes('mod@roktodata.com')
  const isOnAdminDashboard = nextUrl.pathname.startsWith('/dashboard/admin')
  const isOnModDashboard = nextUrl.pathname.startsWith('/dashboard/moderator')

  return {
    isLoggedIn,
    isAdmin,
    isModerator,
    isOnAdminDashboard,
    isOnModDashboard
  }
}
