'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createMod } from '@/actions/mod'
import { modData, TModData } from '@/constants/schema/register'
import { genders, jilla } from '@/constants/static'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  CreditCard,
  Landmark,
  MailCheck,
  MapPin,
  MapPinned,
  PersonStanding,
  Phone,
  ShieldCheck,
  User2
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CInput, CSelect } from '@/components/customs/CInput'

export default function ModeratorRegister() {
  const [loading, setLoading] = useState(false)
  const { replace } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TModData>({
    resolver: zodResolver(modData)
  })

  const onSubmit = async (data: TModData) => {
    setLoading(true)
    const res = await createMod({ ...data, age: parseInt(data.age) })
    if (res.ok) {
      successAlert({
        body: 'আপনার তথ্যগুলো অ্যাডমিন অ্যাপ্রুভালে পাঠানো হয়েছে। জানিয়ে দেয়া হবে।'
      })
      replace('/auth/access?type=moderator')
    }
    if (res.error) errorAlert({ body: 'একটি ইরর হয়েছে, আবার চেষ্টা করুন।' })
    setLoading(false)
  }

  return (
    <div className='grid gap-y-4 auth__bg px-4 py-8 sm:py-12 rounded-2xl'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          মডারেটর একাউন্ট তৈরি করুন
        </h1>
        <p className='text-sm mt-4 text-light font-medium flex-center gap-2'>
          একাউন্ট আছে?
          <Link
            className='text-secondary font-semibold flex-center'
            href='/auth/access?type=moderator'
          >
            লগইন করুন
            <ArrowRight className='size-5' />
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <CSelect
            label='জেলা'
            message={errors.jilla?.message}
            icon={{ icon: MapPin }}
            data={jilla.map((item) => ({ name: item, value: item }))}
            name='jilla'
            register={register}
            placeholder='আপনার জেলা নির্বাচন করুন'
          />
          <div>
            <CInput
              label='উপজেলা'
              placeholder='রংপুর সদর'
              icon={{ icon: MapPin }}
              register={register}
              name='subJilla'
              message={errors.subJilla?.message}
            />
          </div>
          <div>
            <CInput
              label='থানা'
              placeholder='কোতোয়ালী থানা'
              icon={{ icon: Landmark }}
              register={register}
              name='thana'
              message={errors.thana?.message}
            />
          </div>
          <div>
            <CInput
              label='বিস্তারিত ঠিকানা'
              placeholder='হাবিবনগর, শাপলা চত্বর, কলেজরোড, রংপুর সদর।'
              icon={{ icon: MapPinned }}
              register={register}
              name='address'
              message={errors.address?.message}
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
            <Button loading={loading} type='submit' className='w-full mt-4'>
              আবেদন করুন
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
