import { auth } from '@/configs/auth'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/sonner'

export default async function ProtectedLayout({ children }: IChildren) {
  const session = await auth()
  return (
    <div>
      <Toaster closeButton richColors expand />
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  )
}
