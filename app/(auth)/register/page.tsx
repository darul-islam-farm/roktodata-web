'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { bloodGroups } from '@/constants/static'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import RegisterBasic from '@/components/auth/Register.Basic'
import RegisterCred from '@/components/auth/Register.Cred'
import RegisterLocation from '@/components/auth/Register.Location'

export default function Register() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})
  const [group, setGroup] = useState<string | null>(null)
  const [warn, setWarn] = useState(false)
  const onSubmit = (values: TBasicdata | TLocationdata | TCreddata) => {
    setStep((prev) => prev + 1)
    setData((prev) => ({ ...prev, ...values }))
  }

  const handleSubmit = () => {
    if (!group) {
      return setWarn(true)
    }
    console.log('data', { ...data, group })
  }

  return (
    <div className='grid gap-y-4 auth__bg px-4 py-8 sm:py-12 rounded-xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          একটি একাউন্ট তৈরি করুন
        </h1>
        <p className='text-sm'>
          একাউন্ট আছে?{' '}
          <Link href='/login' className='text-primary hover:underline'>
            লগইন করুন
          </Link>
        </p>
      </div>

      {step === 1 && <RegisterBasic data={data} onSubmit={onSubmit} />}
      {step === 2 && (
        <RegisterLocation data={data} onSubmit={onSubmit} setStep={setStep} />
      )}
      {step === 3 && (
        <RegisterCred data={data} onSubmit={onSubmit} setStep={setStep} />
      )}
      {step === 4 && (
        <div>
          <p className='font-semibold text-lg text-center text-secondary py-1'>
            আপনার রক্তের গ্রুপ নির্বাচন করুন
          </p>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-8 mb-4'>
            {bloodGroups.map((item: string, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  setGroup(item)
                  setWarn(false)
                }}
                className={cn(
                  'col-auto text-5xl text-primary font-bold bg-primary/20 h-28 sm:h-32 rounded-lg hover:shadow-lg hover:border-[1px] hover:border-extralight transform-transition duration-300',
                  item === group && 'bg-primary text-white'
                )}
              >
                {item}
              </button>
            ))}
          </div>
          {warn && (
            <p className='text-xs bg-danger py-1 px-4 text-white'>
              একটি রক্তের গ্রুপ সিলেক্ট করুন
            </p>
          )}
          <div>
            <Button
              onClick={handleSubmit}
              variant='secondary'
              className='w-full mt-4'
            >
              আবেদন সম্পূর্ণ করুন
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setStep((prev) => prev - 1)}
              className='w-full mt-4 text-primarys'
              variant='outline'
            >
              <ArrowLeft className='ml-2 h-4' />
              পূর্ববর্তী
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
