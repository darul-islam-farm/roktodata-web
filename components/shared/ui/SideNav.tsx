'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { siteInfo, TNavItem } from '@/configs/site'
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
import TypeDialog from './TypeDialog'

type TProps = {
  isHome: boolean
  path: string
}
export default function SideNav({ isHome, path }: TProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TypeDialog open={open} setOpen={setOpen} />
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
            <AuthBtn setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
