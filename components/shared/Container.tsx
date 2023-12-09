import React from 'react'

import { cn } from '@/lib/utils'

interface IProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}
const getSizeClass = (breakpoint: string) => {
  switch (breakpoint) {
    case 'sm':
      return 'max-w-3xl'
    case 'md':
      return 'max-w-5xl'
    case 'lg':
      return 'max-w-7xl'
    case 'xl':
      return 'max-w-9xl'
    default:
      return 'max-w-7xl'
  }
}
export default function Container({
  className,
  children,
  size = 'lg'
}: IProps) {
  const classNames = cn(
    'px-4 md:px-8 mx-auto w-full',
    getSizeClass(size),
    className
  )
  return <div className={classNames}>{children}</div>
}
