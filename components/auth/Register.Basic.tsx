'use client'

import {
  basicdata,
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { genders, userTypes } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  CreditCard,
  HeartPulse,
  PersonStanding,
  Phone,
  User2
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { CInput, CSelect } from '../customs/CInput'
import { Button } from '../ui/button'

export default function RegisterBasic({
  onSubmit,
  data
}: {
  onSubmit: (values: TBasicdata | TLocationdata | TCreddata) => void
  data: any
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TBasicdata>({
    resolver: zodResolver(basicdata),
    defaultValues: {
      name: data?.name,
      identity: data?.identity,
      gender: data?.gender,
      phone: data?.phone,
      phone2: data?.phone2
    }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <CInput
            label='আপনার নাম'
            placeholder='মুহাম্মাদ রবিউস সানী'
            icon={{ icon: User2 }}
            register={register}
            name='name'
            message={errors.name?.message}
          />
        </div>
        <div>
          <CInput
            label='আইডেন্টিটি'
            placeholder='xxx xxx xxxx'
            icon={{ icon: CreditCard }}
            register={register}
            name='identity'
            message={errors.identity?.message}
          />
        </div>
        <div>
          <CSelect
            label='লিঙ্গ'
            message={errors.gender?.message}
            icon={{ icon: PersonStanding }}
            data={genders}
            name='gender'
            register={register}
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
          <Button type='submit' className='w-full mt-4'>
            পরবর্তী
            <ArrowRight className='ml-2 h-4' />
          </Button>
        </div>
      </div>
    </form>
  )
}
