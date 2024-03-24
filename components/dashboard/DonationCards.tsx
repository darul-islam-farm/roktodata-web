import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'

export default function DonationCards({
  donations
}: {
  donations: TDonation[]
}) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-8'>
        {donations.map((donation, idx) => (
          <div
            key={idx}
            className='col-auto card-shadow bg-white flex justify-center py-8'
          >
            <div>
              <div className='overflow-hidden'>
                <div className='relative w-32 h-32'>
                  <Image
                    src={`https://utfs.io/f/${donation.image}`}
                    alt='donations'
                    width={150}
                    height={100}
                    className='object-center bg-cover'
                  />
                </div>
              </div>
              <div className='mt-4 px-2'>
                <p className='uppercase font-medium text-xs'>Donation #1</p>
                <p className='font-light mt-2'>{donation.address}</p>
                <Link
                  href={`/donation?id=${donation.id}`}
                  className={cn('mt-4', buttonVariants())}
                >
                  বিস্তারিত দেখুন <ArrowRight className='size-5' />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
