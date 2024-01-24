import { cn } from '@/lib/utils'

interface InputProps {
  transparent?: boolean
  message?: string
  register: any
  type?: string
  label: string
  optional?: boolean
  data?: { value: string | number; name: string | number }[]
  size?: 'sm'
  theme?: 'light' | 'dark'
}

type TProps = InputProps &
  (
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
    | React.SelectHTMLAttributes<HTMLSelectElement>
  )

const GInput = ({
  className,
  type = 'text',
  name,
  message,
  register,
  transparent,
  label,
  optional,
  theme = 'light',
  ...props
}: TProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn('text-sm font-medium', theme === 'dark' && 'text-light')}
      >
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
          'h-10 shadow-sm focus-visible:shadow-lg  w-full rounded-md border-[1.5px] border-neutral-200 focus-visible:border-secondary/60 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
          transparent ? 'bg-transparent' : 'bg-white',
          className
        )}
        {...register(name)}
        {...props}
        id={name}
      />
      <p className='text-danger text-xs font-medium mt-1'>{message}</p>
    </div>
  )
}
GInput.displayName = 'Input'

const GSelect = ({
  className,
  name,
  message,
  register,
  label,
  optional,
  placeholder = 'select one',
  data,
  size,
  theme = 'light',
  ...props
}: TProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn('text-sm font-medium', theme === 'dark' && 'text-light')}
      >
        {label}
        {optional && (
          <span className='text-sm ml-1 font-normal text-litetext'>
            (optional)
          </span>
        )}
      </label>
      <select
        defaultValue=''
        className={cn(
          'shadow-sm focus-visible:shadow-lg  w-full rounded-md border-[1.5px] border-neutral-200 focus-visible:border-secondary/60 px-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
          'bg-white',
          size === 'sm' ? 'h-8' : 'h-10',
          className
        )}
        {...register(name)}
        {...props}
        id={name}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {data?.map(({ name, value }, idx) => (
          <option value={value} key={idx}>
            {name}
          </option>
        ))}
      </select>
      <p className='text-danger text-xs font-medium mt-1'>{message}</p>
    </div>
  )
}
GSelect.displayName = 'Select'

const GTextarea = ({
  className,
  register,
  name,
  message,
  transparent,
  label,
  optional,
  ...props
}: TProps) => {
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
      <textarea
        className={cn(
          'shadow-sm focus-visible:shadow-lg w-full rounded-md border-[1.5px] border-neutral-200 focus-visible:border-secondary/60 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
          transparent ? 'bg-transparent' : 'bg-white',
          className
        )}
        {...register(name)}
        rows={4}
        {...props}
        id={name}
      />
      <p className='text-danger text-xs font-medium mt-1'>{message}</p>
    </div>
  )
}
GTextarea.displayName = 'Textarea'

export { GInput, GSelect, GTextarea }
