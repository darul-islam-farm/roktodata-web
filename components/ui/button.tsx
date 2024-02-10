import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor:pointer focus-visible:outline-none focus-visible:ring-none disabled:pointer-events-none disabled:bg-litetext/50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:opacity-80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        destructive:
          'bg-red-500 text-neutral-50 hover:opacity-80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        outline:
          'border border-primary bg-transparent hover:opacity-80 text-white',
        secondary:
          'bg-secondary text-white hover:bg-secondary/80 dark:bg-secondary/80 dark:hover:bg-secondary',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
        primarysubtle: 'bg-primary/10 text-primary hover:bg-primary/30',
        secondarysubtle: 'bg-secondary/10 text-secondary hover:bg-secondary/30'
      },
      size: {
        default: 'h-8 md:h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-2',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  children: any
}

const Button = ({
  className,
  variant,
  size,
  loading,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }), 'relative')}
      {...props}
    >
      {loading ? <div className='loader'></div> : children}
    </button>
  )
}

Button.displayName = 'Button'

export { Button, buttonVariants }
