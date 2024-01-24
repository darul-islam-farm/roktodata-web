'use client'

import Appbar from '../shared/ui/Appbar'
import SearchModal from '../shared/ui/SearchModal'
import { Button } from '../ui/button'

export default function HomeSlide({ image }: { image: string }) {
  return (
    <div
      className='w-full min-h-[50vh] md:min-h-[80vh] bg-no-repeat bg-cover bg-center '
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='min-h-[50vh] md:min-h-[80vh] bg-black/30 px-4 sm:px-8 lg:px-0'>
        <Appbar isHome />
        <div className=' max-w-3xl pt-10 pb-10 md:pb-0 md:pt-32 mx-auto text-center md:text-start'>
          <div>
            <h1 className='text-4xl tracking-wider sm:text-7xl text-light font-bold'>
              স্বাগত <span className='text-red-600'>রক্তদাতা</span> ডট কম এ
            </h1>
            <p className='text-sm md:text-lg text-light mt-4 md:mt-10'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              ipsa sit eveniet excepturi nostrum quasi eos eaque quos, est
              libero, fuga aut id voluptatibus necessitatibus labore officiis
              recusandae quo similique.
            </p>
            <div className='my-10 md:mb-0 pb-10 flex gap-4 flex-col md:flex-row w-full'>
              <SearchModal />
              <Button
                onClick={() => alert('din')}
                className='bg-white button-shadow text-primary hover:bg-primary hover:text-white'
              >
                রক্ত দান করুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
