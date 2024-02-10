'use client'

import { useRouter } from 'next/navigation'
import { Clock4Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function DonorCard({ donor }: { donor: TUser }) {
  const { push } = useRouter()

  const address = [
    { title: 'জেলা', value: donor.jilla },
    { title: 'উপজেলা', value: donor.subJilla },
    {
      title: 'ঠিকানা',
      value:
        donor.address.length > 25
          ? `${donor.address.slice(0, 25)}...`
          : donor.address
    },
    { title: 'থানা', value: donor.thana }
  ]

  return (
    <div className='p-4 rounded-lg donor-card shadow-lg'>
      <div className='flex justify-start gap-2 sm:gap-4'>
        <div className='flex items-center'>
          <div className='bg-white shadow-lg shadow-black/50 size-32 rounded-full flex-center text-primary font-bold text-5xl'>
            {donor.bloodType}
          </div>
        </div>

        <div className='bg-light w-1 rounded' />

        <div>
          <h1 className='text-white text-2xl md:text-base font-bold'>
            {donor.name}
          </h1>
          <p className='text-sm text-light mb-2'>{donor.email}</p>
          <div className='flex flex-col gap-y-1'>
            <div className='flex items-center gap-4'>
              {address.slice(0, 2).map((item, idx) => (
                <div key={idx} className='text-sm'>
                  <p className='font-medium text-light -mb-1'>{item.title}</p>
                  <p className='text-light'>{item.value}</p>
                </div>
              ))}
            </div>
            {address.slice(2, 3).map((item, idx) => (
              <div key={idx} className='text-sm'>
                <p className='font-medium text-light -mb-1'>{item.title}</p>
                <p className='text-light'>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='text-end mt-4'>
        <Button
          shadow
          onClick={() => push(`/profile/donor?id=${donor.id}`)}
          size='sm'
          className='bg-light text-primary'
        >
          <Clock4Icon />
          <span>প্রোফাইল দেখুন</span>
        </Button>
      </div>
    </div>
  )
}
