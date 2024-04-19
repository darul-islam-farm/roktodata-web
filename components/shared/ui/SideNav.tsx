'use client'

import Image from 'next/image'
import Link from 'next/link'
import { siteInfo } from '@/configs/site'
import { AlignLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import AuthBtn from './AuthBtn'

type TProps = {
  isHome: boolean
  path: string
}
export default function SideNav({ isHome, path }: TProps) {
  return (
    <>
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
            {siteInfo.navItems.map(
              ({ name, href }: { name: string; href: string }, idx: number) => (
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
              )
            )}
            <AuthBtn />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
