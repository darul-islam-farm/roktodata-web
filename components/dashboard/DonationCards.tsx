import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCheck, SendHorizonal } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '../ui/button'

export default function DonationCards({
  donations
}: {
  donations: TDonation[]
}) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-8'>
        {donations.map((donation, idx) => (
          <div key={idx} className='col-auto card-shadow bg-white p-3'>
            <div>
              <div className='overflow-hidden'>
                <div className='relative w-full h-32'>
                  <Image
                    src={
                      donation.image
                        ? `https://utfs.io/f/${donation.image}`
                        : '/images/donations/donate1.jpg'
                    }
                    alt='donations'
                    fill
                    className={cn(
                      'object-center bg-cover rounded-t',
                      !donation.image && 'brightness-50'
                    )}
                  />
                </div>
              </div>
              <div className='mt-4'>
                <p className='uppercase font-medium text-xs'>Donation #1</p>
                <p className='font-light mt-2'>{donation.address}</p>
                <div className='flex gap-3 items-center mt-4'>
                  <Link
                    href={`/donation?id=${donation.id}`}
                    className={buttonVariants({ variant: 'primarysubtle' })}
                  >
                    বিস্তারিত দেখুন <ArrowRight className='size-5' />
                  </Link>
                  {donation.shared ? (
                    <Button disabled>
                      <CheckCheck className='size-5' /> শেয়ার করেছেন
                    </Button>
                  ) : (
                    <Link
                      href={`/dashboard/receiver/share?donationId=${donation.id}`}
                      className={buttonVariants({ variant: 'secondarysubtle' })}
                    >
                      শেয়ার করুন <SendHorizonal className='size-5' />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
