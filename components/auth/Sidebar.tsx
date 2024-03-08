'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logOut } from '@/actions/user'
import { siteInfo, TNavItem } from '@/configs/site'
import { confirmAlert } from '@/services/alerts/alerts'
import { ArrowLeft, LogOut, User2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type TProps = {
  mobile?: boolean
  user: TUserSession
  admin?: boolean
  donor?: boolean
}

export default function Sidebar({ mobile, user, admin, donor }: TProps) {
  const pathname = usePathname()
  const { push } = useRouter()

  const meta = useMemo(() => {
    if (donor) return siteInfo.donorDashboardItem
    else if (admin) return siteInfo.adminDashboardItem
    else return siteInfo.userDashboardItem
  }, [admin, donor])
  return (
    <div
      style={{ scrollbarColor: 'white transparent' }}
      className={cn('bg-primary h-full overflow-auto', admin && 'bg-secondary')}
    >
      {!mobile && (
        <div className='fixed'>
          <Link
            href='/'
            className='flex items-center gap-2 font-medium text-sm mb-4'
          >
            <ArrowLeft /> হোম এ যান
          </Link>
        </div>
      )}
      <div className='py-4 lg:pt-16 lg:pb-0'>
        {!admin && (
          <div className='pl-4'>
            <User2
              className='bg-white text-primary size-12 lg:size-16 rounded-full p-2'
              strokeWidth={1}
            />
            <div className='mt-4'>
              <h1 className='text-light'>{user?.name}</h1>
              <p className='text-sm text-light opacity-80'>{user?.email}</p>
            </div>
          </div>
        )}
        <div className='mt-8'>
          {meta.map((item: TNavItem, idx: number) =>
            item.child ? (
              <DropdownMenu key={idx}>
                <DropdownMenuTrigger
                  className={cn(
                    'flex w-full itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2',
                    !mobile && 'rounded-lg',
                    admin && 'text-sm lg:text-sm'
                  )}
                >
                  <item.icon strokeWidth={2} />
                  {item.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='min-w-[300px]'>
                  <DropdownMenuLabel>আবেদনসমূহ</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {item.child.map((childLink, i) => (
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={() => push(childLink.href)}
                      key={i}
                    >
                      {childLink.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={idx}
                href={item.href}
                className={cn(
                  'flex itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2',
                  !mobile && 'rounded-lg',
                  pathname === item.href &&
                    'bg-light/20 border-l-2 border-white',
                  admin && 'text-sm lg:text-sm'
                )}
              >
                <item.icon strokeWidth={2} />
                {item.name}
              </Link>
            )
          )}
          {!mobile && (
            <button
              onClick={() => {
                confirmAlert({
                  title: 'Are you sure',
                  body: 'Sign out from roktodata?',
                  precom: logOut
                })
              }}
              className={cn(
                'w-full flex itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2 rounded-lg',
                admin && 'text-sm lg:text-sm'
              )}
            >
              <LogOut />
              লগআউট
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
