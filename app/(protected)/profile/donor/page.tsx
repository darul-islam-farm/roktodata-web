'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { api } from '@/configs/site'
import requests from '@/services/network/http'
import dayjs from 'dayjs'
import { ArrowLeftIcon } from 'lucide-react'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import Container from '@/components/shared/Container'

export default function DonorProfile() {
  const searchparams = useSearchParams()

  const { data, isLoading, error } = useAsync(
    `${api}/api/donor/get-donor-profile?id=${searchparams.get('id')}`,
    requests.get
  )
  return isLoading ? (
    /* 
    TODO: add loading skeleton for user profile info.
    */
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
    /* 
    TODO: add appropriate error message
    */
    <div>error ocurred</div>
  ) : (
    <div>
      <div className='donor-card pb-32'>
        <div className='mb-2 ml-2 md:ml-12 pt-2 w-24 md:w-28'>
          <Link
            href='/'
            className='bg-white/50 hover:bg-white rounded p-1 md:p-2 uppercase font-semibold text-xs md:text-sm text-primary flex items-center gap-1'
          >
            <ArrowLeftIcon strokeWidth={1.5} /> Go Home
          </Link>
        </div>
        <div className='max-w-32 md:max-w-40 mx-auto relative'>
          <div className='bg-white shadow-lg shadow-black/50 size-32 md:size-40 rounded-full flex-center text-primary font-bold text-5xl'>
            {data.donor.bloodType}
          </div>
          <div className='absolute bottom-0 right-4 size-5 md:size-7 bg-green-500 rounded-full' />
        </div>
        <div className='text-center mt-3'>
          <h1 className='text-white text-3xl font-bold'>
            {data.donor.user.name}
          </h1>
          <p className='text-light'>{data.donor.user.email}</p>
          <p className='text-light/60 text-sm'>
            Donor from {dayjs(data.donor.user.createdAt).format('D MMM, YYYY')}
          </p>
        </div>

        {/* 
        TODO: place reviews link and star here like ` ★★★★★ | review -> `
        */}
      </div>
      <div className='max-w-[22rem] sm:max-w-[28rem] mx-auto'>
        <div className='-mt-20 rounded-t-xl shadow-2xl shadow-dark/20  bg-white'>
          <div className='p-4 grid gap-y-2'>
            <div className='grid grid-cols-2'>
              <div className='col-auto'>
                <p className='font-medium text-dark'>jilla</p>
                <p className=''>{data.donor.user.jilla}</p>
              </div>
              <div className='col-auto'>
                <p className='font-medium text-dark'>sub jilla</p>
                <p className=''>{data.donor.user.subJilla}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='col-auto'>
                <p className='font-medium text-dark'>thana</p>
                <p className=''>{data.donor.user.thana}</p>
              </div>
              <div className='col-auto'>
                <p className='font-medium text-dark'>religion</p>
                <p className=''>{data.donor.user.religion}</p>
              </div>
            </div>
            <div>
              <p className='font-medium text-dark'>address</p>
              <p className=''>{data.donor.user.address}</p>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <Button className='w-full'>আবেদন করুন</Button>
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
