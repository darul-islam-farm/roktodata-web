'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authenticate } from '@/actions/user'
import { logindata, TLogindata } from '@/constants/schema/register'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ShieldCheck, User2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CInput } from '@/components/customs/CInput'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLogindata>({
    resolver: zodResolver(logindata)
  })
  const onSubmit = async (value: TLogindata) => {
    setLoading(true)
    try {
      await authenticate({ ...value, username: 'admin' })
      setLoading(false)
    } catch (error) {
      errorAlert({ body: 'ভুল ইমেইল অথবা পাসওয়ার্ড' })
      setLoading(false)
    }
  }

  if (session?.user.role === 'ADMIN') return push('/dashboard/admin')

  return (
    <div className='bg-secondary grid gap-y-4 px-3 py-8 sm:p-12 rounded-xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-white mb-4'>অ্যাডমিন লগইন</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CInput
            label='ইমেইল'
            placeholder='me@rabius-sunny.com'
            icon={{ icon: User2 }}
            register={register}
            type='email'
            name='email'
            message={errors.email?.message}
          />
        </div>
        <div>
          <CInput
            label='পাসওয়ার্ড'
            icon={{ icon: ShieldCheck }}
            register={register}
            name='password'
            placeholder='******'
            type='password'
            message={errors.password?.message}
          />
        </div>
        <div>
          <Button
            loading={loading}
            disabled={loading}
            type='submit'
            className='w-full mt-4'
          >
            লগইন
          </Button>
        </div>
        <p className='text-sm mt-4 text-light font-medium flex-center gap-2'>
          আপনি কি একজন রক্তদাতা ?{' '}
          <Link
            className='text-white font-semibold flex-center'
            href='/auth/register?type=donor'
          >
            রেজিস্ট্রেশন করুন
            <ArrowRight className='size-5' />
          </Link>
        </p>
      </form>
    </div>
  )
}
