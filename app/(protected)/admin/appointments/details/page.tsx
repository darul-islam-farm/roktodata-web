'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { deleteAppointment, verifyAppointment } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default function AppointmentsDetails() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const appId = searchParams.get('id') as string
  const appType = searchParams.get('type') as TAppointmentStatus
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )
  const handleAction = async (
    action: TAppointmentStatus,
    type: 'MOD' | 'DEL'
  ) => {
    let asyncFunction = () => verifyAppointment(appId, action)
    if (type === 'DEL') {
      asyncFunction = () => deleteAppointment(appId)
    }
    const res = await asyncFunction()
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'আবার চেষ্টা করুন' }
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
      <div className='mt-12'>
        {appType === 'UNVERIFIED' && (
          <div className='flex flex-col md:flex-row-reverse gap-8'>
            <Button
              onClick={() =>
                confirmAlertAsync({
                  body: 'আবেদনটি ভেরিফাই করা হবে?',
                  precom: () => handleAction('PENDING', 'MOD'),
                  successText:
                    'আবেদনটি ভেরিফাই করা হয়েছে এবং ডোনারকে জানানো হয়েছে।'
                })
              }
              shadow
              className='w-full'
              size='lg'
              variant='secondary'
            >
              ভেরিফাই করুন
            </Button>
            <Button
              onClick={() =>
                confirmAlertAsync({
                  title: 'আবেদনটি ডিলিট করা হবে?',
                  body: 'ডিলিট করা হলে আবেদনের সমস্ত তথ্য মুছে যাবে।',
                  precom: () => handleAction('CANCELED', 'DEL'),
                  successText: 'আবেদনটি ডিলিট করা হয়েছে।'
                })
              }
              shadow
              className='w-full'
              size='lg'
            >
              ডিলিট করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
