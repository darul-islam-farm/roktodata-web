import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <div className='mt-20 py-4 border-t border-slate-300 flex items-center justify-center gap-2 md:gap-3 text-slate-500'>
      <strong className='footer'>রক্তদাতা ডট কম</strong>
      <strong className='footer'>@</strong>
      <strong className='footer'>
        <Link
          className='hover:underline hover:text-sky-500 flex items-center'
          href='https://darulislam.net'
        >
          দারুল ইসলাম ফাউন্ডেশন
          <ArrowUpRight strokeWidth={1.5} className='size-5' />
        </Link>
      </strong>
    </div>
  )
}
