import TopBanner from '@/components/home/TopBanner'
import Appbar from '@/components/shared/ui/Appbar'

export default function BasicLayout({ children }: IChildren) {
  return (
    <div>
      <TopBanner />
      <Appbar />
      <div>{children}</div>
    </div>
  )
}
