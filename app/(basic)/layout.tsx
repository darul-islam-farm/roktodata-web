import Footer from '@/components/shared/ui/Footer'

export default function BasicLayout({ children }: IChildren) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
