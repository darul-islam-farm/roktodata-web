import { auth } from '@/configs/auth'
import { SessionProvider } from 'next-auth/react'

import TopBanner from '@/components/home/TopBanner'
import Appbar from '@/components/shared/ui/Appbar'

export default async function BasicLayout({ children }: IChildren) {
  const session = await auth()
  return (
    <div>
      <SessionProvider session={session}>
        <TopBanner />
        <Appbar />
      </SessionProvider>
      <div>{children}</div>
    </div>
  )
}
