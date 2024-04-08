import { auth } from '@/configs/auth'

import { Toaster } from '@/components/ui/sonner'
import PanelLayout from '@/components/shared/PanelLayout'

export default async function AdminLayout({ children }: IChildren) {
  const session = await auth()
  return (
    <PanelLayout session={session} mod>
      <Toaster closeButton richColors expand />
      {children}
    </PanelLayout>
  )
}
