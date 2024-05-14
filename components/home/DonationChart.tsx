'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Container from '../shared/Container'
import SectionHeader from '../shared/ui/SectionHeader'

export default function DonationChart() {
  const swiperElRef = useRef(null)

  return (
    <div>
      <Container>
        <SectionHeader title='রক্তদানের চার্ট' />
        <div className='hidden md:block'>
          <div className='grid grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-6 place-items-center'>
            {Array.from({ length: 8 }, (count: number) => count).map(
              (_num, idx) => (
                <div key={idx}>
                  <Image
                    src={`/images/others/${idx + 1}.svg`}
                    width={250}
                    height={280}
                    alt='blood donation chart'
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className='md:hidden'>
          <Swiper
            modules={[Autoplay, Pagination]}
            ref={swiperElRef}
            slidesPerView={2}
            loop
            pagination={{
              dynamicBullets: true
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true
            }}
          >
            {Array.from({ length: 8 }, (count: number) => count).map(
              (_num, idx) => (
                <SwiperSlide key={idx} className='pb-8'>
                  <Image
                    src={`/images/others/${idx + 1}.svg`}
                    width={250}
                    height={280}
                    alt='blood donation chart'
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </Container>
    </div>
  )
}
