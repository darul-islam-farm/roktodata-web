import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'হোম',
}

export default function Home() {
  return (
    <main>
      <div className='h-screen flex items-center justify-center'>
        <div>
          <h1 className='font-bold text-3xl text-primary'>
            Welcome to New App
          </h1>
          <div className='text-center mt-8'>
            <Button>App</Button>
          </div>
          <Input placeholder='this is input' />
        </div>
      </div>
    </main>
  )
}
