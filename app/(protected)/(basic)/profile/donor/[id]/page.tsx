'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/configs/site'
import requests from '@/services/network/http'
import dayjs from 'dayjs'
import { ArrowLeftIcon, ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import Container from '@/components/shared/Container'
import Navigate from '@/components/shared/ui/Navigate'

export default function DonorProfile() {
  const { id } = useParams()
  const { back } = useRouter()
  const { data: session } = useSession()

  const { data, isLoading, error } = useAsync(
    `${api}/api/donor/get-donor-profile?id=${id}`,
    requests.get
  )

  return isLoading && !data ? (
    <div>
      <div className='donor-card pt-8 pb-32'>
        <div className='flex items-center justify-center'>
          <div className='bg-white shadow-lg animate-pulse shadow-black/50 size-32 md:size-40 rounded-full' />
        </div>
      </div>
      <div className='-mt-20 h-[40vh] rounded-t-xl shadow-2xl shadow-dark/20 max-w-[22rem] sm:max-w-[28rem] mx-auto bg-white p-4 flex flex-col gap-y-4'>
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
      </div>
    </div>
  ) : error ? (
    <div className='flex-center h-screen'>
      <div className='text-center text-5xl'>
        <p className='text-red-500 font-medium'>
          একটি ইরর হয়েছে, কোনো ডোনার পাওয়া যায়নি
        </p>
        <Button variant='link' onClick={() => back()}>
          <ArrowLeftIcon /> আবার চেষ্টা করুন
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <div className='donor-card pb-32 pt-2'>
        <Navigate />
        <div className='max-w-32 md:max-w-40 mx-auto relative'>
          <div className='bg-white shadow-lg shadow-black/50 size-32 md:size-40 rounded-full flex-center text-primary font-bold text-5xl'>
            {data.donor.bloodType}
          </div>
          <div className='absolute bottom-0 right-4 size-5 md:size-7 bg-green-500 rounded-full' />
        </div>
        <div className='text-center mt-3'>
          <h1 className='text-white text-3xl font-bold'>{data.donor.name}</h1>
          <p className='text-light'>{data.donor.user.email}</p>
          <p className='text-light/60 text-sm'>
            Donor from {dayjs(data.donor.user.createdAt).format('D MMM, YYYY')}
          </p>
        </div>

        {/** 
        @TODO - place reviews link and star here like ` ★★★★★ | review -> `
        */}
      </div>
      <div className='max-w-[22rem] sm:max-w-[28rem] mx-auto'>
        <div className='-mt-20 rounded-t-xl shadow-2xl shadow-dark/20  bg-white'>
          <div className='p-4 grid gap-y-2'>
            <div className='grid grid-cols-2'>
              <div className='col-auto'>
                <p className='font-medium text-dark'>জেলা</p>
                <p className=''>{data.donor.user.jilla}</p>
              </div>
              <div className='col-auto'>
                <p className='font-medium text-dark'>উপজেলা</p>
                <p className=''>{data.donor.user.subJilla}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='col-auto'>
                <p className='font-medium text-dark'>থানা</p>
                <p className=''>{data.donor.user.thana}</p>
              </div>
              <div className='col-auto'>
                <p className='font-medium text-dark'>ধর্ম</p>
                <p className=''>{data.donor.user.religion}</p>
              </div>
            </div>
            <div>
              <p className='font-medium text-dark'>ঠিকানা</p>
              <p className=''>{data.donor.user.address}</p>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <Link
            className={cn(buttonVariants(), 'w-full')}
            href={
              session?.user
                ? `/application?donor=${id}&receiver=${session.user.id}`
                : `/auth/register?type=receiver&donor=${id}`
            }
          >
            আবেদন করুন <ArrowRight className='size-5' />
          </Link>
        </div>
      </div>

      <div className='mt-12'>
        <Container size='md'>
          <h1>পূর্বের ডোনেশনসমূহ</h1> <hr className='mt-2 border-dark/20' />
          <div className='my-8'>
            <div className='text-red-600 font-medium'>
              এই ডোনারের পূর্বের কোনো ডোনেশন নেই।
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
