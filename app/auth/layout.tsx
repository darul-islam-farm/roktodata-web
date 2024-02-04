import Link from 'next/link'
import { auth } from '@/configs/auth'
import { ArrowLeftIcon } from 'lucide-react'
import { SessionProvider } from 'next-auth/react'

export default async function AuthLayout({ children }: IChildren) {
  const session = await auth()
  return (
    <div
      style={{ backgroundImage: 'url("/images/donations/donate1.jpg")' }}
      className='bg-no-repeat bg-cover bg-right min-h-screen lg:py-12'
    >
      <div className='mb-2 ml-2 md:ml-12 lg:fixed lg:top-2'>
        <Link
          href='/'
          className=' lg:bg-white/50 hover:bg-white/30 rounded pl-2 w-32 py-2 uppercase font-semibold text-sm text-primary flex items-center gap-1'
        >
          <ArrowLeftIcon /> Go Home
        </Link>
      </div>
      <div className='px-4 sm:px-0 sm:flex justify-center items-center min-h-[85vh]'>
        <div className='sm:min-w-[500px] py-12 lg:py-10'>
          <SessionProvider session={session}>{children}</SessionProvider>
        </div>
      </div>
    </div>
  )
}
