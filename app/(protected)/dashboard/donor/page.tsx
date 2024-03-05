'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { updateActiveStatus } from '@/actions/donor'
import { errorAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { ArrowRightCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import ProfileCard from '@/components/dashboard/ProfileCard'

export default function DonorDashboard() {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
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
      <div className='mt-8 card-shadow white p-2 lg:p-4'>
        <h1 className='text-dark'>Donations</h1>
        <p className='text-litetext font-light'>My donations history</p>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-8'>
          <div className='col-auto group'>
            <div className='overflow-hidden w-full rounded-2xl lg:rounded-3xl'>
              <Image
                src='/images/donations/donate1.jpg'
                alt='donations'
                width={300}
                height={200}
                className='w-full group-hover:scale-110 group-hover:brightness-50 duration-300'
              />
            </div>
            <div className='mt-4 px-2'>
              <p className='uppercase font-medium text-xs'>Donation #1</p>
              <p className='font-semibold text-xl text-dark'>
                Donation to Rangpur
              </p>
              <p className='font-light mt-2'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
                facere quisquam voluptate sunt.
              </p>
              <div className='mt-4'>
                <Button variant='outline' className='text-primary'>
                  View Details
                </Button>
              </div>
            </div>
          </div>
          <div className='hidden xl:block col-auto group'>
            <div className='overflow-hidden w-full rounded-2xl lg:rounded-3xl'>
              <Image
                src='/images/donations/donate1.jpg'
                alt='donations'
                width={300}
                height={200}
                className='w-full group-hover:scale-110 group-hover:brightness-50 duration-300'
              />
            </div>
            <div className='mt-4 px-2'>
              <p className='uppercase font-medium text-xs'>Donation #1</p>
              <p className='font-semibold text-xl text-dark'>
                Donation to Rangpur
              </p>
              <p className='font-light mt-2'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
                facere quisquam voluptate sunt.
              </p>
              <div className='mt-4'>
                <Button variant='outline' className='text-primary'>
                  View Details
                </Button>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center text-primary min-h-32 rounded-3xl border-primary/60 border-2'>
            <button
              onClick={() => push('/dashboard/donor/donations')}
              className='flex items-center gap-2'
            >
              সবগুলো দেখুন <ArrowRightCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
