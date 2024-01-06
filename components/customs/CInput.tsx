import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type TInputProps = {
  label: string
  type?: string
  placeholder?: string
  icon: { icon: LucideIcon }
  message?: string
  register: any
  name: string
  required?: boolean
}
type TSelectProps = {
  label: string
  placeholder?: string
  icon: { icon: LucideIcon }
  message?: string
  register: any
  name: string
  data?: any
  hasGroup?: boolean
}

export function CInput({
  label,
  placeholder,
  icon,
  message,
  type = 'text',
  register,
  name,
  required,
  ...rest
}: TInputProps) {
  return (
    <div className='flex items-center gap-4 border-b-2 border-extralight pb-2 mb-3'>
      <div>
        <icon.icon
          strokeWidth={2.2}
          className={cn(message ? 'text-danger' : 'text-extralight')}
        />
      </div>
      <div className='w-[2px] h-10 bg-extralight mr-1' />
      <div className='flex-1'>
        <p className='text-extralight font-medium text-sm'>{label}</p>
        <div>
          <input
            className='w-full text-extralight bg-transparent placeholder:text-white/50 py-1.5 focus:border-0 focus:outline-0 focus:ring-0'
            type={type}
            placeholder={placeholder}
            required={required}
            {...register(name)}
            {...rest}
          />
        </div>
        <p className='text-danger text-xs md:text-sm font-medium mt-1'>
          {message}
        </p>
      </div>
    </div>
  )
}

export function CSelect({
  label,
  placeholder = 'নির্বাচন করুন',
  icon,
  message,
  data,
  register,
  name,
  hasGroup,
  ...rest
}: TSelectProps) {
  return (
    <div className='flex items-center gap-4 border-b-2 border-extralight pb-2 mb-3'>
      <div>
        <icon.icon
          strokeWidth={2.2}
          className={cn(message ? 'text-danger' : 'text-extralight')}
        />
      </div>
      <div className='w-[2px] h-10 bg-extralight mr-1' />
      <div className='flex-1'>
        <p className='text-extralight font-medium text-sm'>{label}</p>
        <select
          defaultValue=''
          className='w-full bg-transparent text-white/50 py-0.5 focus:border-0 focus:outline-0 focus:ring-0'
          {...register(name)}
          {...rest}
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {data.map(
            ({ name, value }: { name: string; value: string }, idx: number) => (
              <option value={value} key={idx}>
                {name}
              </option>
            )
          )}
        </select>
        <p className='text-danger text-xs md:text-sm font-medium mt-1'>
          {message}
        </p>
      </div>
    </div>
  )
}
