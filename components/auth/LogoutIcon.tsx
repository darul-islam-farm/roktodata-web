'use client'

import { logOut } from '@/actions/user'
import { confirmAlert } from '@/services/alerts/alerts'
import { LogOut } from 'lucide-react'

export default function LogoutIcon() {
  return (
    <button
      onClick={() => {
        confirmAlert({
          title: 'লগআউট করবেন?',
          body: 'আপনি কি লগআউট করবেন?',
          precom: logOut
        })
      }}
    >
      <LogOut
        className='px-1 bg-white/50 hover:bg-primary hover:text-white rounded text-primary h-8 w-9 cursor-pointer'
        strokeWidth={1}
      />
    </button>
  )
}
