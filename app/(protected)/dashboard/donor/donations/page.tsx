import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function donations() {
  return (
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
      </div>
    </div>
  )
}
