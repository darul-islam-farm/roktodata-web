'use client'

import { useRouter } from 'next/navigation'
import { api } from '@/configs/site'
import requests from '@/services/network/http'
import { ArrowRight, Facebook, Twitter, Youtube } from 'lucide-react'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'

import { Button } from '../ui/button'

export default function ProfileCard({ onProfile }: { onProfile?: boolean }) {
  const { push } = useRouter()
  const { data: session } = useSession()

  const { data, isLoading, error } = useAsync(
    `${api}/api/user/get-own-info?id=${session?.user.id}`,
    requests.get
  )

  return (
    <div className='card-shadow p-2 lg:p-4'>
      <h1 className='text-dark'>প্রোফাইল তথ্য</h1>
      <p className='text-litetext text font-light text-sm'>
        একাউন্টের বেসিক তথ্যগুলো এখানে দেখানো হয়েছে, বিস্তারিত দেখতে ও এডিট করতে
        এডিট বাটনে ক্লিক করুন।
      </p>
      <hr className='my-4' />
      {onProfile ? (
        <div></div>
      ) : (
        <div className='flex flex-col gap-3'>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>পূর্ণ নাম: </p>
              <p className='font-light text-litetext'>{data?.user?.name}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>ফোন নং: </p>
              <p className='font-light text-litetext'>{data?.user?.phone}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>ইমেইল:</p>
              <p className='font-light text-litetext'>{data?.user?.email}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>ঠিকানা:</p>
              <p className='font-light text-litetext'>{data?.user?.address}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Social Links:</p>
              <div className='flex items-center gap-3'>
                <Facebook className='size-6 rounded-full bg-secondary text-light p-1' />
                <Twitter className='size-6 rounded-full bg-secondary text-light p-1' />
                <Youtube className='size-6 rounded-full bg-secondary text-light p-1' />
              </div>
            </div>
          </div>
          <div className='text-right'>
            <Button onClick={() => push('/dashboard/donor/profile')}>
              এডিট করুন <ArrowRight height={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
