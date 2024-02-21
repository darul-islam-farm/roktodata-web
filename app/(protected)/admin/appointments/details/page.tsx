'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { deleteAppointment } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default function AppointmentsDetails() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const appId = searchParams.get('id') as string
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )
  const handleDelete = async () => {
    const res = await deleteAppointment(appId)
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'আবেদনটি ডিলিট হয়নি।' }
  }
  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div className='text-red-500 font-medium text-3xl text-center'>
        ইরর হয়েছে, আবার চেষ্টা করুন।
      </div>
    )
  return (
    <div>
      <DetailsApplication data={data.appointment} access='ADMIN' />
      <div className='mt-12 flex flex-col md:flex-row gap-8'>
        <Button
          onClick={() =>
            confirmAlertAsync({
              body: 'আবেদনটি ডিলিট করা হবে?',
              precom: handleDelete,
              successText: 'আবেদনটি ডিলিট করা হয়েছে।'
            })
          }
          shadow
          className='w-full'
          size='lg'
        >
          ডিলেট করুন
        </Button>
        <Button shadow className='w-full' size='lg' variant='secondary'>
          অ্যাপ্রুভ করুন
        </Button>
      </div>
    </div>
  )
}
