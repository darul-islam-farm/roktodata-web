'use client'

import { useSearchParams } from 'next/navigation'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default function AppointmentsDetails() {
  const searchParams = useSearchParams()
  const appId = searchParams.get('id') as string
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )
  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div className='text-red-500 font-medium text-3xl text-center'>
        ইরর হয়েছে, আবার চেষ্টা করুন।
      </div>
    )
  return (
    <div>
      <DetailsApplication data={data.appointment} access='DONOR' />
    </div>
  )
}
