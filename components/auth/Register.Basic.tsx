'use client'

import {
  basicdata,
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { genders, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CreditCard, PersonStanding, User2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { CInput, CSelect } from '../customs/CInput'
import { Button } from '../ui/button'

type TProps = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: TBasicdata | TLocationdata | TCreddata) => void
  data: any
}
export default function RegisterBasic({ onSubmit, data }: TProps) {
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
      religion: data?.religion,
      age: data?.age
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
          <CSelect
            label='ধর্ম'
            message={errors.religion?.message}
            icon={{ icon: User2 }}
            data={religions}
            name='religion'
            register={register}
          />
        </div>
        <div>
          <CSelect
            label='বয়স'
            message={errors.age?.message}
            icon={{ icon: User2 }}
            data={Array.from({ length: 24 }, (_, index) => index + 17).map(
              (item) => ({ name: item.toString(), value: item })
            )}
            name='age'
            register={register}
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
