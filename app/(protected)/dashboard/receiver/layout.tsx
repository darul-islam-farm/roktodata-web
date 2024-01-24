import { Metadata } from 'next'

import PanelLayout from '@/components/shared/PanelLayout'

export const metadata: Metadata = {
  title: 'ড্যাশবোর্ড'
}

export default function UserLayout({ children }: IChildren) {
  return <PanelLayout>{children}</PanelLayout>
}
