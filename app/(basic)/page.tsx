import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { whyDonate } from '@/constants/static'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import HomeSlider from '@/components/customs/HomeSlider'
import ContactFrom from '@/components/home/ContactFrom'
import TopBanner from '@/components/home/TopBanner'
import Container from '@/components/shared/Container'
import SectionHeader from '@/components/shared/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'হোম'
}

export default function Home() {
  return (
    <main>
      <TopBanner isHome />
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
              <p className='text-litetext text-sm'>{item.description}</p>
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

      {/* Our Impact section */}
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
              <p className='mt-2 text-litetext md:text-sm lg:text-md'>
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
                <p className='font-semibold text-lg text-litetext'>donors</p>
              </div>
              <div className='text-center'>
                <h1 className='text-primary font-bold text-5xl sm:text-6xl lg:text-7xl'>
                  2k+
                </h1>
                <p className='font-semibold text-lg text-litetext'>donations</p>
              </div>
              <div className='text-center'>
                <h1 className='text-primary font-bold text-5xl sm:text-6xl lg:text-7xl'>
                  64
                </h1>
                <p className='font-semibold text-lg text-litetext'>venues</p>
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
              <p className='mt-2 text-litetext md:text-sm lg:text-md'>
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

      {/* CTA section */}
      <div className='my-20'>
        <div className='bg-primary'>
          <Container
            size='sm'
            className='py-12 flex flex-col gap-y-10 lg:gap-0 lg:flex-row lg:items-center justify-between'
          >
            <div>
              <h1 className='text-4xl font-semibold text-white mb-2'>
                তো আর কীসের জন্য অপেক্ষা করছেন?
              </h1>
              <p className='text-lg text-extralight'>
                আজই দান করুন মহামূল্যবান ও শ্রেষ্ঠ উপহার, একজন মুমূর্ষু প্রাণকে,
                যে আপনার অনুগ্রহের অপেক্ষায়।
              </p>
            </div>
            <div className='sm:self-end lg:self-center'>
              <Button className='bg-white button-shadow w-full sm:w-auto text-primary'>
                ডোনেট করুন
              </Button>
            </div>
          </Container>
        </div>
        <div className='bg-secondary'>
          <Container
            size='sm'
            className='py-12 flex flex-col gap-y-10 lg:gap-0 lg:flex-row lg:items-center justify-between'
          >
            <div>
              <Button className='bg-primary button-shadow w-full sm:w-auto text-white'>
                রক্ত নিন
              </Button>
            </div>
            <div className='order-first lg:order-last'>
              <h1 className='text-4xl font-semibold text-white mb-2'>
                আপনি কি রক্ত খুঁজছেন?
              </h1>
              <p className='text-lg text-extralight'>
                আমাদের ডেডিকেটেড ভলান্টিয়ার দ্বারা রক্ত পেতে আজই রেজিস্ট্রেশন
                করুন।
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Blog section */}
      <Container>
        <SectionHeader title='ব্লগ থেকে পড়ুন' />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8'>
          {[1, 2, 3, 4].map((idx) => (
            <div className='col-auto group' key={idx}>
              <Image
                src='/images/donations/donate1.jpg'
                alt='donations'
                width={300}
                height={250}
                className='w-full'
              />
              <div className='mt-4 px-2 pb-4 group-hover:shadow-xl duration-300 rounded-lg'>
                <p className='uppercase font-medium text-xs flex gap-2 items-center'>
                  <span>{idx + 20} dec, 2023</span>
                  <span className='h-1 w-1 rounded-full bg-litetext' />
                  <span>admin-roktodataweb</span>
                </p>
                <h2 className='text-dark'>ব্লগ টাইটেল - রক্তদাতা ব্লগ</h2>
                <p className='font-light mt-2'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Atque facere quisquam voluptate sunt.
                </p>
                <div className='mt-4'>
                  <Link
                    href='/'
                    className='flex items-center gap-1 font-medium text-xs'
                  >
                    বিস্তারিত পড়ুন <ArrowRight className='size-4' />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Contact Section */}
      <ContactFrom />
    </main>
  )
}
