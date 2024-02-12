'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authenticate } from '@/actions/user'
import { logindata, TLogindata } from '@/constants/schema/register'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck, User2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CInput } from '@/components/customs/CInput'
import TypeDialog from '@/components/Dialogs/TypeDialog'

export default function Login() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')
  console.log('callback', callbackUrl)
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
      await authenticate(value)
    } catch {
      errorAlert({ title: 'ভুল ইমেইল অথবা পাসওয়ার্ড', timer: 2500 })
      setLoading(false)
    }
  }
  if (session) {
    if (callbackUrl) {
      push(callbackUrl)
      return
    }
    push('/')
  }
  return (
    <div className='auth__bg grid gap-y-4 px-4 py-8 sm:p-12 rounded-xl'>
      <TypeDialog open={open} setOpen={setOpen} />
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>লগইন করুন</h1>
        <p className='text-sm text-light/70'>
          একাউন্ট নেই?{' '}
          <button
            className='text-primary hover:underline'
            onClick={() => setOpen(true)}
          >
            তৈরি করুন
          </button>
        </p>
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
      </form>
    </div>
  )
}
