'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Container from '../shared/Container'
import SectionHeader from '../shared/ui/SectionHeader'

export default function DonationChart() {
  const swiperElRef = useRef(null)

  return (
    <div>
      <Container size='md'>
        <SectionHeader title='রক্তদানের চার্ট' />
        <div className='hidden md:block'>
          <div className='grid grid-cols-3 xl:grid-cols-4 gap-6 place-items-center'>
            {Array.from({ length: 8 }, (count: number) => count).map(
              (_num, idx) => (
                <div
                  key={idx}
                  className='bg-white p-2 lg:px-6 lg:py-4 rounded-xl shadow-xl group'
                >
                  <Image
                    src={`/images/others/${idx + 1}.svg`}
                    width={200}
                    height={280}
                    className='group-hover:scale-110 duration-150'
                    alt='blood donation chart'
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className='md:hidden relative'>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            ref={swiperElRef}
            slidesPerView={2}
            loop
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true
            }}
            spaceBetween={10}
          >
            {Array.from({ length: 8 }, (count: number) => count).map(
              (_num, idx) => (
                <SwiperSlide key={idx} className='pb-8'>
                  <div className='bg-white p-2 rounded-lg group'>
                    <Image
                      src={`/images/others/${idx + 1}.svg`}
                      width={200}
                      height={250}
                      className='w-full group-hover:scale-105 duration-150'
                      alt='blood donation chart'
                    />
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
          <div className='swiper-button-prev'>
            <ChevronLeft className=' bg-secondary text-white rounded-full' />
          </div>
          <div className='swiper-button-next'>
            <ChevronRight className=' bg-secondary text-white rounded-full' />
          </div>
        </div>
      </Container>
    </div>
  )
}
