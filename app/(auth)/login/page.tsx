import Link from 'next/link'

export default function Login() {
  return (
    <div className='grid gap-y-4 border-lighttext/20 shadow-xl border-2 p-4 sm:p-6 rounded-xl my-8 lg:my-16'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>লগিন করুন</h1>
        <p className='text-sm text-lighttext'>
          একাউন্ট নেই?{' '}
          <Link href='/register' className='text-primary hover:underline'>
            তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  )
}
