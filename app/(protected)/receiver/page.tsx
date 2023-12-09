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
            Receiver Dashboard
          </h1>
        </div>
      </div>
    </main>
  )
}
