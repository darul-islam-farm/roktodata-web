import { Metadata } from 'next'
import Image from 'next/image'
import { whyDonate } from '@/constants/static'

import HomeSlider from '@/components/customs/HomeSlider'
import Container from '@/components/shared/Container'
import SectionHeader from '@/components/shared/SectionHeader'

export const metadata: Metadata = {
  title: 'হোম'
}

export default function Home() {
  return (
    <main>
      <HomeSlider />
      {/* Why donate blood section */}
      <Container>
        <SectionHeader title='কেন রক্তদান করবেন' />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6'>
          {whyDonate.map((item, idx) => (
            <div key={idx} className='col-auto'>
              <div className='mb-2 flex items-center gap-2'>
                <item.icon
                  className='text-primary h-12 w-12 sm:h-16 sm:w-16'
                  strokeWidth={1.2}
                />
                <h2 className='font-medium text-xl text-dark'>{item.title}</h2>
              </div>
              <p className='text-lighttext text-sm'>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
      {/* Who donate blood section */}
      <div className='bg-primary pb-16 my-16'>
        <Container size='md'>
          <SectionHeader title='কে রক্ত দিতে পারবেন ?' color='white' />
          <div className='grid place-items-center grid-cols-3 gap-2'>
            <div className='col-span-1'>
              <div className=' text-center'>
                <h1 className='text-3xl font-bold text-white mb-2'>নারী</h1>
                <div className='flex justify-center'>
                  <Image
                    src='/images/others/female.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                </div>
                <div className='mt-8 flex items-center gap-2'>
                  <Image
                    src='/images/others/femaleage.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                  <p className='font-medium text-white text-xs sm:text-lg'>
                    সর্বনিম্ন বয়স
                  </p>
                </div>
                <div className='mt-2 flex items-center gap-2'>
                  <p className='font-medium text-white text-xs sm:text-lg'>
                    সর্বনিম্ন বয়স
                  </p>
                  <Image
                    src='/images/others/femaleage.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                </div>
                <div className='mt-2 flex items-center gap-2'>
                  <Image
                    src='/images/others/femaleage.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                  <p className='font-medium text-white text-xs sm:text-lg'>
                    সর্বনিম্ন বয়স
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <Image
                src='/images/others/devider.svg'
                alt='devider'
                width={80}
                height={200}
              />
            </div>
            <div className='col-span-1'>
              <div className=' text-center'>
                <h1 className='text-3xl font-bold text-white mb-2'>পুরুষ</h1>
                <div className='flex justify-center'>
                  <Image
                    src='/images/others/female.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                </div>
                <div className='mt-8 flex items-center gap-2'>
                  <Image
                    src='/images/others/femaleage.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                  <p className='font-medium text-white text-xs sm:text-lg'>
                    সর্বনিম্ন বয়স
                  </p>
                </div>
                <div className='mt-2 flex items-center gap-2'>
                  <p className='font-medium text-white text-xs sm:text-lg'>
                    সর্বনিম্ন বয়স
                  </p>
                  <Image
                    src='/images/others/femaleage.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                </div>
                <div className='mt-2 flex items-center gap-2'>
                  <Image
                    src='/images/others/femaleage.png'
                    alt='male'
                    width={50}
                    height={50}
                  />
                  <p className='font-medium text-white text-xs sm:text-lg'>
                    সর্বনিম্ন বয়স
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* Donation chart section */}
      <Container>
        <SectionHeader title='রক্তদানের চার্ট' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 place-items-center'>
          {Array.from({ length: 8 }, (item: number) => item).map(
            (item: number, idx) => (
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
      </Container>

      <Container className='mt-10'>
        <SectionHeader title='আমাদের ইমপ্যাক্ট' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8 md:mb-16'>
          <div className='col-auto'>
            <div className='rounded-3xl overflow-hidden'>
              <Image
                src='/images/donations/donate2.jpg'
                alt='blood donatetion'
                width={300}
                height={200}
                className='w-full'
              />
            </div>
          </div>
          <div className='col-auto flex flex-col justify-between'>
            <div>
              <h1 className='text-3xl lg:text-5xl font-medium'>
                Lorem Ipsum dolor text
              </h1>
              <p className='mt-2 text-lighttext md:text-sm lg:text-md'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                perspiciatis, commodi dicta omnis tenetur similique facere sit
                enim corrupti sapiente quidem nam culpa numquam distinctio quo
                sunt eligendi, ut assumenda veniam. Illum aut culpa similique
                quam! Dicta hic molestias impedit, delectus aliquid quos quasi
                distinctio. Non molestias nemo perferendis corporis.
              </p>
            </div>
            <div className='mt-10 lg:mt-0 flex items-center justify-between'>
              <div className='text-center'>
                <h1 className='text-primary font-bold text-5xl sm:text-6xl lg:text-7xl'>
                  120
                </h1>
                <p className='font-semibold text-lg text-lighttext'>donors</p>
              </div>
              <div className='text-center'>
                <h1 className='text-primary font-bold text-5xl sm:text-6xl lg:text-7xl'>
                  2k+
                </h1>
                <p className='font-semibold text-lg text-lighttext'>
                  donations
                </p>
              </div>
              <div className='text-center'>
                <h1 className='text-primary font-bold text-5xl sm:text-6xl lg:text-7xl'>
                  64
                </h1>
                <p className='font-semibold text-lg text-lighttext'>venues</p>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2'>
          <div className='col-auto'>
            <div>
              <h1 className='text-3xl lg:text-5xl font-medium'>
                Lorem Ipsum dolor text
              </h1>
              <p className='mt-2 text-lighttext md:text-sm lg:text-md'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                perspiciatis, commodi dicta omnis tenetur similique facere sit
                enim corrupti sapiente quidem nam culpa numquam distinctio quo
                sunt eligendi, ut assumenda veniam. Illum aut culpa similique
                quam! Dicta hic molestias impedit, delectus aliquid quos quasi
                distinctio. Non molestias nemo perferendis corporis.
              </p>
            </div>
          </div>
          <div className='col-auto order-first md:order-last'>
            <div className='rounded-3xl overflow-hidden'>
              <Image
                src='/images/donations/donate3.jpg'
                alt='blood donatetion'
                width={300}
                height={200}
                className='w-full'
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
