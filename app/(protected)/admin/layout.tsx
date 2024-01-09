import PanelLayout from '@/components/shared/ui/PanelLayout'

export default function AdminLayout({ children }: IChildren) {
  return <PanelLayout admin>{children}</PanelLayout>
}
