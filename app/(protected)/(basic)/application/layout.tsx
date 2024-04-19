import Appbar from '@/components/shared/ui/Appbar'

export default async function ApplicationLayout({ children }: IChildren) {
  return (
    <div>
      <Appbar />
      {children}
    </div>
  )
}
