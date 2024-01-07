import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean
  message?: string
  register: any
  type?: string
  label: string
  optional?: boolean
}
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  transparent?: boolean
  message?: string
  register: any
  type?: string
  label: string
}

const GInput = ({
  className,
  type = 'text',
  name,
  message,
  register,
  transparent,
  label,
  optional,
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className='text-sm font-medium'>
        {label}
        {optional && (
          <span className='text-sm ml-1 font-normal text-litetext'>
            (optional)
          </span>
        )}
      </label>
      <input
        type={type}
        className={cn(
          'h-10 shadow-sm focus-visible:shadow-lg  w-full rounded-md border-[1.5px] border-neutral-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
          transparent ? 'bg-transparent' : 'bg-white',
          className
        )}
        {...register(name)}
        {...props}
        id={name}
      />
      <p className='text-danger text-xs md:text-sm font-medium mt-1'>
        {message}
      </p>
    </div>
  )
}

GInput.displayName = 'Input'

const GTextarea = ({
  className,
  register,
  name,
  message,
  transparent,
  label,
  ...props
}: TextareaProps) => {
  return (
    <div>
      <label htmlFor={name} className='text-sm font-medium'>
        {label}
      </label>
      <textarea
        className={cn(
          'shadow-sm focus-visible:shadow-lg w-full rounded-md border-[1.5px] border-neutral-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
          transparent ? 'bg-transparent' : 'bg-white',
          className
        )}
        {...register(name)}
        rows={4}
        {...props}
        id={name}
      />
      <p className='text-danger text-xs md:text-sm font-medium mt-1'>
        {message}
      </p>
    </div>
  )
}

GTextarea.displayName = 'Textarea'

export { GInput, GTextarea }
