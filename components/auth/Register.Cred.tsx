'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  creddata,
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  MailCheck,
  Phone,
  ShieldCheck
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { CInput } from '../customs/CInput'
import { Button } from '../ui/button'

type TProps = {
  onSubmit: (values: TBasicdata | TLocationdata | TCreddata) => void
  setStep: Dispatch<SetStateAction<number>>
  data: any
}
export default function RegisterCred({ onSubmit, setStep, data }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TCreddata>({
    resolver: zodResolver(creddata),
    defaultValues: {
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
      phone2: data?.phone2
    }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CInput
          label='ইমেইল অ্যাড্রেস'
          type='email'
          placeholder='user@active-email.com'
          icon={{ icon: MailCheck }}
          register={register}
          name='email'
          message={errors.email?.message}
        />
      </div>
      <div>
        <CInput
          label='ফোন নম্বর'
          placeholder='01XXXXXXXXX'
          icon={{ icon: Phone }}
          register={register}
          name='phone'
          message={errors.phone?.message}
        />
      </div>
      <div>
        <CInput
          label='বিকল্প ফোন নম্বর'
          placeholder='01XXXXXXXXX'
          icon={{ icon: Phone }}
          register={register}
          name='phone2'
          message={errors.phone2?.message}
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
      <div className='flex items-center gap-4'>
        <Button
          variant='outline'
          onClick={() => setStep((prev) => prev - 1)}
          type='button'
          className='w-full mt-4 text-primary'
        >
          <ArrowLeft className='ml-2 h-4' />
          পূর্ববর্তী
        </Button>
        <Button type='submit' className='w-full mt-4'>
          পরবর্তী <ArrowRight className='ml-2 h-4' />
        </Button>
      </div>
    </form>
  )
}
