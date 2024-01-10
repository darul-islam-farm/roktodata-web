'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <h1 className='text-red-500 h-40 flex items-center justify-center'>
      একটি ইরর হয়েছে। আবার চেষ্টা করুন।
    </h1>
  )
}
