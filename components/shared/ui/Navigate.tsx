'use client'

import { useRouter } from 'next/navigation'

export default function Navigate() {
  const { push, back } = useRouter()
  return (
    <div className='mb-2 ml-2 md:ml-12 w-24 md:w-28 text-primary flex transition-all shadow-lg'>
      <button
        onClick={() => push('/')}
        className='text-sm bg-white/50 hover:bg-white py-1 rounded-l px-3 w-full duration-200'
      >
        HOME
      </button>
      <button
        onClick={() => back()}
        className='text-sm bg-white/50 hover:bg-white py-1 sm:py-2 rounded-r px-3 sm:px-4 w-full duration-200'
      >
        BACK
      </button>
    </div>
  )
}
