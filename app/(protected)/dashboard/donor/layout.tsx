import { Metadata } from 'next'

import PanelLayout from '@/components/shared/PanelLayout'

export const metadata: Metadata = {
  title: 'ড্যাশবোর্ড'
}
export default async function DonorLayout({ children }: IChildren) {
  return <PanelLayout donor>{children}</PanelLayout>
}
