'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRightCircle, Facebook, Twitter, Youtube } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import ProfileCard from '@/components/dashboard/ProfileCard'

export default function DonorDashboard() {
  const { push } = useRouter()
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='col-auto'>
          <ProfileCard />
        </div>
        <div className='col-auto'>
          <div className='card-shadow p-2 lg:p-4'>
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
          </div>
        </div>
      </div>
      <div className='mt-8 card-shadow p-2 lg:p-4'>
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
