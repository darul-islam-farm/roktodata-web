import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Container from '@/components/shared/Container'

export default function AboutUs() {
  return (
    <div>
      <div className='relative h-[60vh] md:h-[80vh] lg:h-screen'>
        {/* Full-width image */}
        <Image
          fill
          className='object-cover w-full h-full brightness-50'
          src='/images/others/aboutus.png'
          alt='donate together'
        />

        {/* Centered text */}
        <div className='absolute inset-0 flex items-center justify-center text-white text-center'>
          <Container>
            <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-relaxed sm:leading-[5rem] md:leading-[6rem] xl:text-8xl xl:leading-[8rem]'>
              জড়িয়ে নিন রক্তের বাঁধনে, <br /> আপনারই মতো, <br /> আরেকটি প্রাণকে
            </h1>
          </Container>
        </div>
      </div>
      <Container size='md' className='mt-20 mb-10'>
        <h1>আমাদের মিশন</h1>
        <p className='mt-4 text-lg'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
          nihil tenetur voluptatem alias praesentium porro sint doloremque
          maiores similique. Ducimus nostrum ipsum eum perspiciatis illum ipsam
          a. Voluptas hic error porro commodi, culpa sit nobis quae officiis
          mollitia velit, repudiandae minima aut adipisci rem iure repellendus
          quod neque reprehenderit? Fugit minus error saepe enim tenetur.
          Fugiat, facere aliquid! Dicta ipsam sapiente eius, commodi laborum,
          consequuntur non nesciunt temporibus quidem magnam labore. Est
          architecto nam labore, sapiente aut provident, numquam minus alias
          expedita nemo maxime ipsa ex, libero nihil consequuntur. Adipisci
          voluptates at, cupiditate molestiae sapiente sequi totam consequatur
          ullam repudiandae!
        </p>
      </Container>
      <Container>
        <div className='mt-10'>
          <h1>আমাদের গল্পগুলো</h1>
          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8'>
            {Array.from({ length: 6 }, (i, j) => j + 1).map((n) => (
              <div key={n} className='col-auto'>
                <div className='overflow-hidden rounded-xl'>
                  <Image
                    src='/images/others/blog.png'
                    alt='blog thumbnail'
                    width={300}
                    height={100}
                    className='w-full'
                  />
                </div>
                <h3 className='mt-2'>বনানীতে একটি অবর্ণণীয় ঘটনা</h3>
                <p className='mt-2 text-sm'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus hic magnam doloribus sapiente labore vel?
                </p>
                <div className='mt-4'>
                  <Link
                    href='/'
                    className='flex items-center gap-1 font-medium text-xs text-secondary'
                  >
                    বিস্তারিত পড়ুন <ArrowRight className='size-4' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
