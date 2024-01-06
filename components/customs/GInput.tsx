import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean
}
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  transparent?: boolean
}

const GInput = ({ className, type, transparent, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        'h-10 shadow-sm focus-visible:shadow-lg  w-full rounded-md border-[1.5px] border-neutral-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none focus-visible: disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
        transparent ? 'bg-transparent' : 'bg-white',
        className
      )}
      {...props}
    />
  )
}

GInput.displayName = 'Input'

const GTextarea = ({ className, transparent, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        ' shadow-sm focus-visible:shadow-lg w-full rounded-md border-[1.5px] border-neutral-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none focus-visible: disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
        transparent ? 'bg-transparent' : 'bg-white',
        className
      )}
      rows={4}
      {...props}
    />
  )
}

GTextarea.displayName = 'Textarea'

export { GInput, GTextarea }
