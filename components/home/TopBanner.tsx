import { PhoneCall } from 'lucide-react'

import { cn } from '@/lib/utils'

import Container from '../shared/Container'

export default function TopBanner({ isHome }: { isHome?: boolean }) {
  return (
    <div className={isHome ? 'bg-primary' : 'bg-white'}>
      <Container className='flex items-center justify-between py-1 sm:py-3'>
        <p
          className={cn(
            'font-medium text-white text-lg md:text-2xl',
            !isHome && 'text-primary'
          )}
        >
          এখুনি রক্ত লাগবে ?
        </p>
        <a
          className={cn(
            'text-white text-lg md:text-2xl flex items-center gap-2',
            !isHome && 'text-primary'
          )}
          href='tel:+8801999999999'
        >
          <PhoneCall /> 01999999999
        </a>
      </Container>
    </div>
  )
}
