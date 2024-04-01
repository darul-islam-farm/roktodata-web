'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { authenticate } from '@/actions/user'
import { logindata, TLogindata } from '@/constants/schema/register'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ShieldCheck, User2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CInput } from '@/components/customs/CInput'

type TSearchParams = 'admin' | 'moderator'

export default function Login() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const { replace } = useRouter()
  const type = searchParams.get('type') as TSearchParams
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
      await authenticate({ ...value, username: admin ? 'admin' : 'moderator' })
      setLoading(false)
    } catch {
      errorAlert({ body: 'ভুল ইমেইল অথবা পাসওয়ার্ড' })
      setLoading(false)
    }
  }
  if (type !== 'moderator' && type !== 'admin') return notFound()
  if (session?.user.role === 'ADMIN') return replace('/dashboard/admin')
  if (session?.user.role === 'MODERATOR') return replace('/dashboard/moderator')
  const admin = type === 'admin'

  return (
    <div className='bg-secondary grid gap-y-4 px-3 py-8 sm:p-12 sm:pb-8 rounded-xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-white mb-4'>
          {admin ? 'অ্যাডমিন' : 'মডারেটর'} লগইন
        </h1>
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
        {admin ? (
          <Link
            className='text-white text-sm mt-8 font-semibold flex-center gap-2'
            href='?type=moderator'
          >
            মডারেটর লগইন
            <ArrowRight className='size-5' />
          </Link>
        ) : (
          <div className='grid gap-4'>
            <Link
              className='text-white text-sm mt-8 font-semibold flex-center gap-2 border border-white/40 py-2 px-4 rounded-full'
              href='/auth/access/register'
            >
              মডারেটর রেজিস্ট্রেশন
              <ArrowRight className='size-5' />
            </Link>
            <Link
              className='text-white text-sm font-semibold flex-center gap-2'
              href='?type=admin'
            >
              অ্যাডমিন লগইন
              <ArrowRight className='size-5' />
            </Link>
          </div>
        )}
      </form>
    </div>
  )
}
