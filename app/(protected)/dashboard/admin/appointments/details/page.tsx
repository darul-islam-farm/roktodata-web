'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  declineAppointment,
  deleteDeclinedAppointment,
  updateAppointmentStatus
} from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'

type TAppointmentType = 'declined' | 'normal'

export default function AppointmentsDetails() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const appId = searchParams.get('id') as string
  const type = searchParams.get('type') as TAppointmentType

  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}&type=${type}`,
    requests.get
  )

  const handleVerifyOrReject = async (status: TAppointmentStatus) => {
    const res =
      status === 'REJECTED'
        ? await declineAppointment(appId, 'REJECTED')
        : await updateAppointmentStatus(appId, status)
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'আবার চেষ্টা করুন' }
  }

  const handleDeleteDeclined = async () => {
    const res = await deleteDeclinedAppointment(appId)
    if (res.ok) {
      back()
      return { ok: true }
    }
    if (res.error) return { error: 'আবার চেষ্টা করুন' }
  }

  if (isLoading)
    return <div className='text-center text-xl font-medium'>Loading...</div>
  if (error || !data)
    return (
      <div className='text-red-500 font-medium text-3xl text-center'>
        ইরর হয়েছে, আবার চেষ্টা করুন।
      </div>
    )

  return (
    <div>
      <DetailsApplication data={data.appointment} access='ADMIN' />
      <div className='mt-12'>
        {data.appointment.status === 'UNVERIFIED' && (
          <div className='flex flex-col md:flex-row-reverse gap-8'>
            <Button
              onClick={() =>
                confirmAlertAsync({
                  body: 'আবেদনটি ভেরিফাই করা হবে?',
                  precom: () => handleVerifyOrReject('PENDING'),
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
                  body: 'আবেদনটি রিজেক্ট করা হবে?',
                  precom: () => handleVerifyOrReject('REJECTED'),
                  successText: 'আবেদনটি রিজেক্ট করা হয়েছে।'
                })
              }
              shadow
              className='w-full'
              size='lg'
            >
              রিজেক্ট করুন
            </Button>
          </div>
        )}

        {data.appointment.status === 'REJECTED' && (
          <Button
            onClick={() =>
              confirmAlertAsync({
                body: 'আবেদনটি ডিলিট করা হবে?',
                precom: handleDeleteDeclined,
                successText: 'আবেদনটি ডেটাবেজ থেকে মুছে ফেলা হয়েছে।'
              })
            }
            shadow
            className='w-full'
            size='lg'
          >
            ডিলিট করুন
          </Button>
        )}
      </div>
    </div>
  )
}
