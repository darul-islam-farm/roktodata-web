import { Metadata } from 'next'

import Appbar from '@/components/shared/ui/Appbar'

export const metadata: Metadata = {
  title: 'আবেদন ফর্ম'
}
export default async function ApplicationLayout({ children }: IChildren) {
  return (
    <div>
      <Appbar />
      {children}
    </div>
  )
}
