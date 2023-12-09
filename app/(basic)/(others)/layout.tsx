import Appbar from '@/components/shared/ui/Appbar'

export default function BasicLayout({ children }: IChildren) {
  return (
    <div>
      <Appbar />
      <div>{children}</div>
    </div>
  )
}
