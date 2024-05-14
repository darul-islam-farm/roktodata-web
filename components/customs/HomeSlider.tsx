'use client'

import { useRef } from 'react'
import { donationimages } from '@/constants/static'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import HomeSlide from '../home/HomeSlide'

export default function HomeSlider() {
  const swiperElRef = useRef(null)

  return (
    <Swiper
      modules={[EffectFade, Autoplay, Pagination]}
      effect={'fade'}
      ref={swiperElRef}
      slidesPerView={1}
      loop
      pagination={{
        dynamicBullets: true
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false
      }}
    >
      {donationimages.map((item: string, idx: number) => (
        <SwiperSlide key={idx}>
          <HomeSlide image={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
