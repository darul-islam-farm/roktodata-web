import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

export default function AuthLayout({ children }: IChildren) {
  return (
    <div>
      <div className='my-2 ml-2 md:ml-12'>
        <Link
          href='/'
          className='lg:fixed hover:bg-neutral-100 rounded pl-2 w-32 py-2 uppercase font-semibold text-sm text-primary flex items-center gap-1'
        >
          <ArrowLeftIcon /> Go Home
        </Link>
      </div>
      <div className='px-4 sm:px-0 sm:flex justify-center items-center min-h-screen'>
        <div className='sm:min-w-[500px]'>{children}</div>
      </div>
    </div>
  )
}
