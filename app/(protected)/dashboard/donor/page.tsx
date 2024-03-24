'use client'

import { useState } from 'react'
import { updateActiveStatus } from '@/actions/donor'
import { errorAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'
import { Switch } from '@/components/ui/switch'
import DonationCards from '@/components/dashboard/DonationCards'
import ProfileCard from '@/components/dashboard/ProfileCard'
import CardSkeleton from '@/components/shared/skeleton/Card.S'

export default function DonorDashboard() {
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const { data, isLoading, mutate } = useAsync(
    `/api/user/get-own-info?id=${session?.user.id}`,
    requests.get
  )
  const handleStatusChange = async (status: boolean) => {
    setLoading(true)
    try {
      const res = await updateActiveStatus(status ? 'ACTIVE' : 'INACTIVE')
      res.error && errorAlert({ body: 'একটি ইরর হয়েছে, আবার চেষ্টা করুন।' })
      mutate()
      setLoading(false)
    } catch {
      errorAlert({ body: 'একটি ইরর হয়েছে, আবার চেষ্টা করুন।' })
      setLoading(false)
    }
  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='col-auto'>
          {data ? (
            <ProfileCard data={data.user} isLoading={isLoading} />
          ) : (
            <div className='card-shadow bg-white px-2 py-4 lg:px-4 lg:py-8 h-52 md:h-72 grid gap-4'>
              <div className='rounded bg-extralight animate-pulse' />
              <div className='rounded bg-extralight animate-pulse' />
              <div className='rounded bg-extralight animate-pulse' />
              <div className='rounded bg-extralight animate-pulse' />
              <div className='flex justify-end'>
                <div className='rounded bg-extralight animate-pulse w-32' />
              </div>
            </div>
          )}
        </div>
        <div className='col-auto'>
          {data ? (
            <div className='card-shadow bg-white px-2 py-4 lg:px-4 lg:py-8 h-full'>
              <h1 className='text-dark'>প্লাটফর্ম সেটিং</h1>
              <p className='font-medium uppercase my-2'>একটিভ স্ট্যাটাস</p>
              <div className='flex items-center gap-2 mb-4'>
                <Switch
                  className='data-[state=checked]:bg-success'
                  disabled={loading}
                  defaultChecked={data.user.donorProfile.status === 'ACTIVE'}
                  onCheckedChange={handleStatusChange}
                />
                <label className=' text-litetext'>
                  {data.user.donorProfile.status === 'ACTIVE'
                    ? 'আমি অ্যাকটিভ'
                    : 'আমি ডিঅ্যাকটিভ'}
                </label>
              </div>
            </div>
          ) : (
            <div className='card-shadow bg-white px-2 py-4 lg:px-4 lg:py-8 h-52 md:h-72 grid gap-4'>
              <div className='rounded bg-extralight animate-pulse' />
              <div className='rounded bg-extralight animate-pulse' />
              <div className='rounded bg-extralight animate-pulse' />
              <div className='rounded bg-extralight animate-pulse' />
              <div className='flex justify-end'>
                <div className='rounded bg-extralight animate-pulse w-32' />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-10'>
        <h1 className='text-dark'>Donations</h1>
        <p className='text-litetext font-light'>My donations history</p>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          data && (
            <DonationCards donations={data.user.donorProfile.donationHistory} />
          )
        )}
      </div>
    </div>
  )
}
