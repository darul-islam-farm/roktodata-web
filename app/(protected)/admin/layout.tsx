import { redirect } from 'next/navigation'
import { auth } from '@/configs/auth'

import PanelLayout from '@/components/shared/PanelLayout'

export default async function AdminLayout({ children }: IChildren) {
  const session = await auth()
  if (session?.user.role !== 'ADMIN') redirect('/auth/login')
  return (
    <PanelLayout session={session} admin>
      {children}
    </PanelLayout>
  )
}
