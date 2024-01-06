import { cn } from '@/lib/utils'

type TProps = {
  title: string
  className?: string
  color?: string
}
export default function SectionHeader({ title, className, color }: TProps) {
  return (
    <div className='py-16 text-center'>
      <h1
        className={cn(
          'text-3xl sm:text-5xl lg:text-6xl font-medium',
          color ? `text-${color}` : 'text-primary',
          className
        )}
      >
        {title}
      </h1>
    </div>
  )
}
