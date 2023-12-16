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
    </main>
  )
}
