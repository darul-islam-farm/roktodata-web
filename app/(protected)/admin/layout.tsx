import { redirect } from 'next/navigation'
import { auth } from '@/configs/auth'

import { Toaster } from '@/components/ui/sonner'
import PanelLayout from '@/components/shared/PanelLayout'

export default async function AdminLayout({ children }: IChildren) {
  const session = await auth()
  /** @TODO redirect unAuth */
  // if (session?.user.role !== 'ADMIN') redirect('/auth/login')
  return (
    <PanelLayout session={session} admin>
      <Toaster closeButton richColors expand />
      {children}
    </PanelLayout>
  )
}
