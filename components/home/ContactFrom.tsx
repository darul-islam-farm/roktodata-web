import { contactInfo } from '@/constants/static'

import { GInput, GTextarea } from '../customs/GInput'
import Container from '../shared/Container'
import { Button } from '../ui/button'

export default function ContactFrom() {
  return (
    <Container size='md' className='my-20'>
      <div className='bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-1 px-4 lg:px-6 pt-10 contact__bg'>
          <h2 className='text-white text-center md:text-start font-medium text-3xl sm:text-4xl mb-10'>
            যোগাযোগ তথ্য
          </h2>
          {contactInfo.map((item, idx) => (
            <div key={idx} className='flex items-center gap-4 mb-7'>
              <item.icon className='text-white/80' />
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-white/80'>{item.title}</p>
                <p className='text-white/70 font-medium'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='col-span-2 px-4 lg:px-6 pt-10'>
          <h2 className='text-center md:text-start font-medium text-3xl sm:text-4xl mb-10'>
            যোগাযোগ করুন
          </h2>
          <form className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='col-auto'>
                <label htmlFor='name' className='text-sm font-medium'>
                  আপনার নাম
                </label>
                <GInput id='name' transparent />
              </div>
              <div className='col-auto'>
                <label htmlFor='email' className='text-sm font-medium'>
                  আপনার ইমেইল
                </label>
                <GInput required id='email' type='email' transparent />
              </div>
            </div>
            <div>
              <label htmlFor='subject' className='text-sm font-medium'>
                বিষয়
              </label>
              <GInput required id='subject' transparent />
            </div>
            <div>
              <label htmlFor='message' className='text-sm font-medium'>
                আপনার মেসেজ
              </label>
              <GTextarea required id='message' transparent />
            </div>

            <div className='text-right my-8'>
              <Button className='w-full sm:w-auto' type='submit'>
                মেসেজ পাঠান
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
