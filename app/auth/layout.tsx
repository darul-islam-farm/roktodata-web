import { auth } from '@/configs/auth'
import { SessionProvider } from 'next-auth/react'

import Navigate from '@/components/shared/ui/Navigate'

export default async function AuthLayout({ children }: IChildren) {
  const session = await auth()
  return (
    <div
      style={{ backgroundImage: 'url("/images/donations/donate1.jpg")' }}
      className='bg-no-repeat bg-cover bg-right min-h-screen pt-2'
    >
      <Navigate />
      <div className='px-4 sm:px-0 sm:flex justify-center items-center min-h-[85vh]'>
        <div className='sm:min-w-[500px] py-12 lg:py-10'>
          <SessionProvider session={session}>{children}</SessionProvider>
        </div>
      </div>
    </div>
  )
}
