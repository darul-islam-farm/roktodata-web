'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logOut } from '@/actions/user'
import { siteInfo } from '@/configs/site'
import { confirmAlert } from '@/services/alerts/alerts'
import { ArrowLeft, LogOut, User2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type TProps = {
  mobile?: boolean
  user: TUserSession
  Close?: any
}

export default function Sidebar({ mobile, user }: TProps) {
  const pathname = usePathname()
  return (
    <div className='bg-primary h-full'>
      {!mobile && (
        <Link
          href='/'
          className='flex items-center gap-2 font-medium text-sm w-1/2 uppercase mb-4'
        >
          <ArrowLeft /> হোম এ যান
        </Link>
      )}
      <div className='pt-4'>
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
        <div className='mt-8'>
          {siteInfo.donorDashboardItem.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className={cn(
                'flex itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2',
                !mobile && 'rounded-lg',
                pathname === item.link && 'bg-light/20 border-l-2 border-white'
              )}
            >
              <item.icon strokeWidth={2} />
              {item.name}
            </Link>
          ))}
          {!mobile && (
            <button
              onClick={() => {
                confirmAlert({
                  title: 'Are you sure',
                  body: 'Sign out from roktodata?',
                  precom: logOut
                })
              }}
              className='w-full flex itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2 rounded-lg'
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
