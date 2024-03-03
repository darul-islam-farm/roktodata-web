'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createReceiver, createUser } from '@/actions/user'
import {
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { bloodGroups } from '@/constants/static'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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
  const donor = searchParams.get('donor')
  const { push, replace } = useRouter()
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

  const create_user = async () => {
    let serverFunc = createReceiver
    if (userType === 'donor') {
      serverFunc = createUser
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

      res.error && errorAlert({ title: res.error, timer: 5000 })
      if (res.ok) {
        if (userType === 'donor') {
          successAlert({
            title: 'সফল হয়েছে',
            body: 'আপনার রেজিস্ট্রেশন সফল হয়েছে। ভেরিফাই করা হলে জানিয়ে দেয়া হবে।'
          })
          replace('/auth/login')
        } else if (userType === 'receiver') {
          replace(`/application?donor=${donor}&receiver=${res.data}`)
        }
      }
    } catch (error) {
      errorAlert({ title: error, timer: 5000 })
    }
  }

  if (userType !== 'donor' && userType !== 'receiver') push('/')

  return (
    <div className='grid gap-y-4 auth__bg px-4 py-8 sm:py-12 rounded-2xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          {userType === 'donor' ? 'রক্তদাতা' : 'রক্তগ্রহীতা'} একাউন্ট তৈরি করুন
        </h1>
        <p className='text-sm mt-4 text-light font-medium flex-center gap-2'>
          একাউন্ট আছে?
          <Link
            className='text-secondary font-semibold flex-center'
            href={donor ? `/auth/login?donor=${donor}` : '/auth/login'}
          >
            লগইন করুন
            <ArrowRight className='size-5' />
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
                <Button onClick={create_user} variant='secondary'>
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
