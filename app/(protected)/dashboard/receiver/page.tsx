'use client'

import requests from '@/services/network/http'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'

export default function Home() {
  const { data: session } = useSession()

  const { data } = useAsync(
    `/api/receiver/get-own-info?id=${session?.user.id}`,
    requests.get
  )

  console.log('data', data)
  return (
    <main>
      <div className='h-screen flex items-center justify-center'>
        <div>
          <h1 className='font-bold text-3xl text-primary'>
            Receiver Dashboard
          </h1>
        </div>
      </div>
    </main>
  )
}
