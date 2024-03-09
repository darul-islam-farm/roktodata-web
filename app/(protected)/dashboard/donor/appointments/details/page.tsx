'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { updateAppointmentStatus } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import DetailsApplication from '@/components/dashboard/DetailsApplication'
import CancelDialog from '@/components/Dialogs/CancelDialog'

export default function AppointmentsDetailsForDonor() {
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const appId = searchParams.get('id') as string
  const { back } = useRouter()
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )

  const handleAction = async () => {
    const res = await updateAppointmentStatus(appId, 'ACCEPTED')
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
      <DetailsApplication data={data.appointment} access='DONOR' />

      <CancelDialog appId={appId} open={open} setOpen={setOpen} />

      <div
        className={cn(
          'mt-12 flex flex-col md:flex-row-reverse gap-8',
          data.appointment.status === 'ACCEPTED' && 'hidden'
        )}
      >
        <Button
          onClick={() =>
            confirmAlertAsync({
              body: 'আবেদনটি গ্রহণ করা হবে?',
              precom: handleAction,
              successText:
                'আবেদনটি গ্রহণ করা হয়েছে। অনুগ্রহ করে সঠিক সময়ে সঠিক স্থানে গিয়ে আপনার মূল্যবান ডোনেশনটি সম্পন্ন করুন। জাযাকাল্লাহু খাইরান।'
            })
          }
          shadow
          className='w-full'
          size='lg'
          variant='secondary'
        >
          গ্রহণ করুন
        </Button>
        <Button
          onClick={() => setOpen(true)}
          shadow
          className='w-full'
          size='lg'
        >
          ক্যান্সেল করুন
        </Button>
      </div>
    </div>
  )
}
