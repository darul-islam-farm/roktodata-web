'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteInfo, TNavItem } from '@/configs/site'
import { User2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { cn } from '@/lib/utils'

import Container from '../Container'
import SideNav from './SideNav'

export default function Appbar({ isHome = false }) {
  const session = useSession()
  const path = usePathname()
  return (
    <div className={cn(isHome ? 'bg-transparent' : 'bg-primary')}>
      <Container className='h-20 flex items-center justify-between'>
        <div className='lg:hidden'>
          <SideNav isHome={isHome} path={path} />
        </div>
        <div className='w-32 sm:w-48'>
          <Link href='/'>
            <Image
              src='/logowhite.svg'
              alt='logo'
              width={150}
              height={50}
              className='w-full'
            />
          </Link>
        </div>

        <div className='hidden lg:block'>
          {siteInfo.navItems.map(({ name, href }: TNavItem, idx: number) => (
            <Link
              className={cn(
                'text-white font-medium mx-4 hover:underline underline-offset-8',
                href.includes(path) && !isHome && 'underline',
                isHome ? 'decoration-primary' : 'decoration-white',
                isHome && href === '/' && 'underline'
              )}
              key={idx}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
        <div>
          <Link href={session.data ? '/dashboard/donor' : '/auth/login'}>
            <User2
              className={cn('bg-white h-10 w-10 rounded-full p-1 text-primary')}
            />
          </Link>
        </div>
      </Container>
    </div>
  )
}
