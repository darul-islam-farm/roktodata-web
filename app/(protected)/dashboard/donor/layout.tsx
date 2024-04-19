import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/configs/auth'

import PanelLayout from '@/components/shared/PanelLayout'

export const metadata: Metadata = {
  title: 'ড্যাশবোর্ড'
}
export default async function DonorLayout({ children }: IChildren) {
  const session = await auth()
  if (session?.user.role !== 'DONOR') redirect('/auth/login')
  return (
    <PanelLayout session={session} donor>
      {children}
    </PanelLayout>
  )
}
