'use client'

import Head from 'next/head'
import Image from 'next/image'
import { Facebook, Twitter, Youtube } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function DonorDashboard() {
  const { data: session } = useSession()
  return (
    <div>
      <Head>
        <title>ড্যাশবোর্ড</title>
      </Head>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='col-auto card-shadow p-2 lg:p-4'>
          <h1 className='text-dark'>Profile Information</h1>
          <p className='text-litetext font-light'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            eligendi atque tenetur delectus iure pariatur aspernatur rem.
          </p>
          <hr className='my-4' />
          <div className='flex flex-col gap-3'>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-medium text-dark'>Full Name: </p>
                <p className='font-light text-litetext'>{session?.user.name}</p>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-medium text-dark'>Mobile:</p>
                <p className='font-light text-litetext'>+8801 53714 XXXX</p>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-medium text-dark'>Email:</p>
                <p className='font-light text-litetext'>
                  {session?.user.email}
                </p>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-medium text-dark'>Location:</p>
                <p className='font-light text-litetext'>Bangladesh</p>
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
          </div>
        </div>
        <div className='col-auto card-shadow p-2 lg:p-4'>
          <h1 className='text-dark'>Platform Settings</h1>
          <p className='font-medium uppercase my-2'>account</p>
          <div className='flex items-center gap-2 mb-4'>
            <Switch checked id='1' />
            <label className=' text-litetext' htmlFor='1'>
              Email me when someone follows me.
            </label>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <Switch id='2' />
            <label className=' text-litetext' htmlFor='2'>
              Email me when someone answers on my post.
            </label>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <Switch id='3' />
            <label className=' text-litetext' htmlFor='3'>
              Email me when someone make a review upon me.
            </label>
          </div>

          <p className='font-medium uppercase mt-4 mb-2'>application</p>
          <div className='flex items-center gap-2 mb-4'>
            <Switch checked id='1' />
            <label className=' text-litetext' htmlFor='1'>
              Email me when someone follows me.
            </label>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <Switch id='2' />
            <label className=' text-litetext' htmlFor='2'>
              Email me when someone answers on my post.
            </label>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <Switch id='3' />
            <label className=' text-litetext' htmlFor='3'>
              Email me when someone make a review upon me.
            </label>
          </div>
        </div>
      </div>
      <div className='mt-8 card-shadow p-2 lg:p-4'>
        <h1 className='text-dark'>Donations</h1>
        <p className='text-litetext font-light'>My donations history</p>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-8'>
          {[1, 2, 3, 4].map((idx) => (
            <div className='col-auto group' key={idx}>
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
                <p className='uppercase font-medium text-xs'>Donation #{idx}</p>
                <p className='font-semibold text-xl text-dark'>
                  Donation to Rangpur
                </p>
                <p className='font-light mt-2'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Atque facere quisquam voluptate sunt.
                </p>
                <div className='mt-4'>
                  <Button variant='outline' className='text-primary'>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
