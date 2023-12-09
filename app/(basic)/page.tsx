import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import HomeSlider from '@/components/customs/HomeSlider'

export const metadata: Metadata = {
  title: 'হোম'
}

export default function Home() {
  return (
    <main>
      <HomeSlider />
    </main>
  )
}
