import TopBanner from '@/components/home/TopBanner'
import Appbar from '@/components/shared/ui/Appbar'

export default function ApplicationLayout({ children }: IChildren) {
  return (
    <div>
      <TopBanner />
      <Appbar />
      {children}
    </div>
  )
}
