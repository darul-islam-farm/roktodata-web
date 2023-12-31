import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { siteInfo, TNavItem } from '@/configs/site'
import { AlignLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

type TProps = {
  isHome: boolean
  path: string
}
export default function SideNav({ isHome, path }: TProps) {
  const { push } = useRouter()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignLeft className='text-white cursor-pointer' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>
            <Image src='/logo.svg' alt='logo' width={150} height={50} />
          </SheetTitle>
        </SheetHeader>
        <div className='grid gap-y-4 py-4'>
          {siteInfo.navItems.map(({ name, href }: TNavItem, idx: number) => (
            <SheetClose asChild key={idx}>
              <Link
                className={cn(
                  'text-dark px-4 py-2 rounded-md block hover:bg-primary/10',
                  href.includes(path) &&
                    !isHome &&
                    'bg-primary/10 border-l-4 border-primary text-primary font-medium',
                  isHome ? 'decoration-primary' : 'decoration-white',
                  isHome &&
                    href === '/' &&
                    'bg-primary/10 border-l-4 border-primary text-primary font-medium'
                )}
                href={href}
              >
                {name}
              </Link>
            </SheetClose>
          ))}
        </div>
        <div className='mt-10 grid gap-y-4'>
          <Button onClick={() => push('/login')}>লগইন করুন</Button>
          <Button onClick={() => push('/register')} variant='secondary'>
            রেজিস্ট্রেশন করুন
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
