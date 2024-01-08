'use client'

import Link from 'next/link'
import { authenticate } from '@/actions/user'
import { creddata, TCreddata } from '@/constants/schema/register'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck, User2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CInput } from '@/components/customs/CInput'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TCreddata>({
    resolver: zodResolver(creddata)
  })
  const onSubmit = async (value: TCreddata) => {
    try {
      await authenticate(value)
    } catch (error) {
      errorAlert({ title: error, timer: 2500 })
    }
  }
  return (
    <div className='auth__bg grid gap-y-4 px-4 py-8 sm:p-12 rounded-xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>লগইন করুন</h1>
        <p className='text-sm text-light/70'>
          একাউন্ট নেই?{' '}
          <Link href='/auth/register' className='text-primary hover:underline'>
            তৈরি করুন
          </Link>
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
          <Button type='submit' className='w-full mt-4'>
            লগইন
          </Button>
        </div>
      </form>
    </div>
  )
}
