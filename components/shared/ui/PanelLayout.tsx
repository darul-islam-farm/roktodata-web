import Link from 'next/link'
import { auth } from '@/configs/auth'
import { AlignCenter, ArrowLeft } from 'lucide-react'
import { SessionProvider } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import LogoutIcon from '@/components/auth/LogoutIcon'
import Sidebar from '@/components/auth/Sidebar'

type TProps = {
  children: React.ReactNode
  donor?: boolean
  admin?: boolean
}

export default async function PanelLayout({ children, donor, admin }: TProps) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className='min-h-screen bg-light lg:p-4'>
        <div
          className={cn(
            'lg:grid lg:grid-cols-5 gap-x-4 rounded-2xl lg:p-4 bg-primary',
            admin && 'lg:grid-cols-7'
          )}
        >
          <div className='hidden lg:block lg:col-span-1 h-[80vh] text-white lg:sticky top-0'>
            <Sidebar donor={donor} admin={admin} user={session?.user} />
          </div>
          <div
            className={cn(
              'lg:col-span-4 max-w-6xl p-4 bg-light rounded-lg',
              admin && 'lg:col-span-6'
            )}
          >
            <div className='lg:hidden flex items-center justify-between h-8 mb-4 sticky z-[9] top-0 bg-light/70'>
              <Link
                href='/'
                className='flex items-center gap-2 font-medium text-xs pr-4 h-full'
              >
                <ArrowLeft /> হোম এ যান
              </Link>
              <div className='flex items-center gap-2'>
                <Sheet>
                  <SheetTrigger asChild>
                    <AlignCenter
                      className='h-full px-1 bg-white/50 hover:bg-primary hover:text-white rounded text-primary h-8 w-9 cursor-pointer'
                      strokeWidth={1}
                    />
                  </SheetTrigger>
                  <SheetContent
                    className='p-0 max-w-[350px] text-white'
                    side='left'
                  >
                    <Sidebar
                      donor={donor}
                      admin={admin}
                      user={session?.user}
                      mobile
                    />
                  </SheetContent>
                </Sheet>
                <LogoutIcon />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
