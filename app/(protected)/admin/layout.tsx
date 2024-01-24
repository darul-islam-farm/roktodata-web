import PanelLayout from '@/components/shared/PanelLayout'

export default function AdminLayout({ children }: IChildren) {
  return <PanelLayout admin>{children}</PanelLayout>
}
