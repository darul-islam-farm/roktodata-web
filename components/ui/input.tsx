import * as React from 'react'
import { ImagePlus } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean
  compact?: boolean
  fileName?: string
}

const Input = ({
  className,
  type,
  transparent,
  compact,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
        transparent ? 'bg-transparent' : 'bg-white',
        compact && 'h-8 py-1',
        className
      )}
      {...props}
    />
  )
}
const FileInput = ({ fileName, disabled, ...props }: InputProps) => {
  return (
    <>
      <label
        htmlFor='input-image'
        className={cn(
          'flex items-center justify-center gap-2 cursor-pointer text-litetext bg-white py-2 px-4 rounded shadow-md overflow-hidden',
          disabled && 'bg-litetext/60'
        )}
      >
        <ImagePlus />{' '}
        <span className='font-medium'>{fileName ?? 'Insert image'}</span>
      </label>
      <input
        type='file'
        className='hidden'
        disabled={disabled}
        {...props}
        id='input-image'
      />
    </>
  )
}
Input.displayName = 'Input'
FileInput.displayName = 'FileInput'

export { Input, FileInput }
