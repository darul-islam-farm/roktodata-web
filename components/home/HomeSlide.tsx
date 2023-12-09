import { Button } from '../ui/button'

export default function HomeSlide({ image }: { image: string }) {
  return (
    <div
      className='w-full min-h-[50vh] md:min-h-[80vh] bg-no-repeat bg-cover bg-center '
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='flex items-center justify-center min-h-[50vh] md:min-h-[80vh] bg-black/30 px-4 lg:px-0'>
        <div className='max-w-3xl mt-10 md:mt-0 text-center lg:text-start'>
          <h1 className='text-4xl sm:text-7xl text-white font-bold'>
            স্বাগত রক্তদাতা ডট কম এ
          </h1>
          <p className='text-lg text-white/80 mt-4 md:mt-10'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            ipsa sit eveniet excepturi nostrum quasi eos eaque quos, est libero,
            fuga aut id voluptatibus necessitatibus labore officiis recusandae
            quo similique.
          </p>
          <div className='mt-4 mb-10 md:mb-0 md:mt-10 flex gap-4 flex-col md:flex-row w-full'>
            <Button onClick={() => alert('nin')}>রক্ত নিন</Button>
            <Button
              onClick={() => alert('din')}
              className='bg-white text-primary hover:bg-primary hover:text-white'
            >
              রক্ত দান করুন
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
