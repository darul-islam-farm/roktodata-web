'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createDonor, createReceiver } from '@/actions/user'
import {
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { bloodGroups } from '@/constants/static'
import { errorAlert } from '@/services/alerts/alerts'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import RegisterBasic from '@/components/auth/Register.Basic'
import RegisterCred from '@/components/auth/Register.Cred'
import RegisterLocation from '@/components/auth/Register.Location'

type TSearchParams = null | 'donor' | 'receiver'

export default function Register() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') as TSearchParams
  const { push } = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})
  const [group, setGroup] = useState<string | null>(null)
  const [warn, setWarn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const onSubmit = (values: TBasicdata | TLocationdata | TCreddata) => {
    setStep((prev) => prev + 1)
    setData((prev) => ({ ...prev, ...values }))
  }

  const handleSubmit = async () => {
    if (!group) {
      return setWarn(true)
    }
    setIsOpen(true)
  }

  const createUser = async () => {
    let serverFunc = createReceiver
    if (userType === 'donor') {
      serverFunc = createDonor
    } else if (userType === 'receiver') {
      serverFunc = createReceiver
    } else {
      alert('unknown user type')
      return
    }
    try {
      const res = await serverFunc({
        ...data,
        bloodType: group
      })
      res.ok && push('/auth/login')
      res.error && errorAlert({ title: res.error })
    } catch (error) {
      errorAlert({ title: error, timer: 5000 })
    }
  }

  if (userType !== 'donor' && userType !== 'receiver') push('/')

  return (
    <div className='grid gap-y-4 auth__bg px-4 py-8 sm:py-12 rounded-xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          একটি একাউন্ট তৈরি করুন
        </h1>
        <p className='text-sm text-light/70'>
          একাউন্ট আছে?{' '}
          <Link href='/auth/login' className='text-primary hover:underline'>
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
            আপনার {userType === 'receiver' && 'আকাঙ্ক্ষিত'} রক্তের গ্রুপ
            নির্বাচন করুন
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
                  'col-auto text-5xl text-primary font-bold bg-primary/20 h-28 sm:h-32 rounded-lg hover:shadow-lg hover:border-[1px] hover:border-extralight duration-100 ',
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

          {/** @TODO add terms & conditions of donation inside Dialog Content  */}
          <AlertDialog open={isOpen}>
            <AlertDialogContent>
              <AlertDialogHeader builtin>
                শর্তাবলীর সাথে সম্মত হোন
              </AlertDialogHeader>
              <AlertDialogDescription>
                রক্তদাতা.COM এ ডোনার হতে হলে আপনাকে রক্তদানের পূর্বশর্তগুলোর
                সাথে সম্মত হতে হবে।
              </AlertDialogDescription>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis placeat nihil voluptates odit deleniti, quaerat
                  accusantium facere voluptatum, aperiam molestiae voluptate
                  reiciendis explicabo ipsam impedit eius quia expedita sequi
                  tempora ullam, incidunt numquam? Quisquam beatae quaerat
                  inventore natus animi nisi, nulla itaque sint ducimus ipsum
                  rerum qui ratione iure mollitia fugit porro, iusto id illo,
                  aliquid dicta nostrum recusandae? Nobis illum accusamus
                  maiores a omnis quas saepe magni quae. Tempora dolor alias
                  aspernatur laborum laboriosam, atque sit, dolores iure in
                  velit ullam quod quibusdam dolore officiis porro fugiat cum,
                  at earum minus non doloribus eaque maiores architecto! Eius,
                  dolore atque.
                </p>
              </div>
              <AlertDialogFooter>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant='primarysubtle'
                >
                  আমি সম্মত নই
                </Button>
                <Button onClick={createUser} variant='secondary'>
                  আমি সম্মত
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
