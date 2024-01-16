import { Toaster } from '@/components/ui/sonner'

export default function ProtectedLayout({ children }: IChildren) {
  return (
    <div>
      <Toaster closeButton richColors expand />
      {children}
    </div>
  )
}
