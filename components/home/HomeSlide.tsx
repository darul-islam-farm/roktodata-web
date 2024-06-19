'use client'

import { useRouter } from 'next/navigation'

import Container from '../shared/Container'
import Appbar from '../shared/ui/Appbar'
import SearchCard from '../shared/ui/SearchCard'
import { Button } from '../ui/button'

export default function HomeSlide({ image }: { image: string }) {
  const { push } = useRouter()
  return (
    <div
      className='w-full min-h-[50vh] md:min-h-[80vh] bg-no-repeat bg-cover bg-center '
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='min-h-[50vh] md:min-h-[80vh] bg-black/50 px-4 sm:px-8 lg:px-0'>
        <Appbar isHome />
        <Container className='py-10 lg:py-28'>
          <div className='grid grid-cols-5 gap-4 lg:gap-16'>
            <div className='col-span-5 lg:col-span-3 lg:order-last'>
              <div className=''>
                <div>
                  <h1 className='text-4xl tracking-wider sm:text-7xl text-light font-bold'>
                    স্বাগত <br /> <span className='text-red-600'>রক্তদাতা</span>{' '}
                    ডট কম এ
                  </h1>
                  <p className='text-sm md:text-lg text-light mt-4 md:mt-10'>
                    রক্তদাতা হল
                    <strong className='px-1'>দারুল ইসলাম ফাউন্ডেশন</strong> এর
                    একটি অলাভজনক সামাজিক প্রজেক্ট। নতুন ডোনার তৈরি ও নানাবিধ
                    সামাজিক সচেতনতা সৃষ্টির মাধ্যমে রক্তদাতা সামাজিক উন্নয়ন ও
                    বন্ধনকে আরো একধাপ এগিয়ে নিতে চায়।
                  </p>
                  <div className='mt-10 md:mb-0 pb-10 w-full'>
                    <Button
                      size='lg'
                      onClick={() => push('/auth/register?type=donor')}
                      className='bg-white button-shadow text-primary w-full md:w-auto'
                    >
                      রক্ত দান করুন
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-5 lg:col-span-2'>
              <SearchCard />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
