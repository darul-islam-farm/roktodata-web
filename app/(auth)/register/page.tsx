'use client'

import { jilla } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreditCard,
  HeartPulse,
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
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { CInput, CSelect } from '@/components/customs/CInput'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  name: z.string().min(4, 'আসল নাম আবশ্যক।'),
  email: z.string().email('সঠিক ইমেইল অ্যাড্রেস আবশ্যক।'),
  password: z.string().min(6, 'পাসওয়ার্ড অন্তত ৬ সংখ্যার হতে হবে।'),
  identity: z.string().min(10, 'সঠিক পরিচয়পত্র নম্বর দিন।'),
  gender: z.string().min(4, 'লিঙ্গ নির্বাচন আবশ্যক।'),
  phone: z.string().min(11, 'সঠিক ফোন নাম্বার দিন।'),
  phone2: z.string().min(11, 'সঠিক ফোন নাম্বার দিন।'),
  bloodType: z.string().min(4, 'রক্তের গ্রুপ আবশ্যক'),
  userType: z.string(),
  jilla: z.string(),
  subJilla: z.string(),
  thana: z.string(),
  currentAddress: z.string(),
  permanentAddress: z.string()
})

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('clicked')
    console.log('values', values)
  }
  return (
    <div className='grid gap-y-4 border-lighttext/60 shadow-xl border-2 p-4 sm:p-6 rounded-xl my-8 lg:my-16'>
      <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold text-primary'>Register an account</h1>
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
            data={[
              { name: 'পুরুষ', value: 'MALE' },
              { name: 'নারী', value: 'FEMALE' }
            ]}
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
        <CSelect
          label='রেজিস্ট্রেশনের ধরণ'
          message={errors.userType?.message}
          icon={{ icon: HeartPulse }}
          data={[
            { name: 'রক্তদাতা', value: 'DONOR' },
            { name: 'রক্ত গ্রহীতা', value: 'RECEIVER' }
          ]}
          name='userType'
          register={register}
        />
        <CSelect
          label='জেলা'
          message={errors.jilla?.message}
          icon={{ icon: MapPin }}
          data={jilla}
          name='jilla'
          register={register}
          hasGroup
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
            label='বর্তমান ঠিকানা'
            placeholder='কলেজরোড, রংপুর সদর।'
            icon={{ icon: MapPinned }}
            register={register}
            name='currentAddress'
            message={errors.currentAddress?.message}
          />
        </div>
        <div>
          <CInput
            label='স্থায়ী ঠিকানা'
            placeholder='কলেজরোড, রংপুর সদর।'
            icon={{ icon: MapPinned }}
            register={register}
            name='permanentAddress'
            message={errors.permanentAddress?.message}
          />
        </div>
        <div>
          <CInput
            label='ইউজারনেম'
            placeholder='rabius-sunny'
            icon={{ icon: User2 }}
            register={register}
            name='username'
            message={errors.username?.message}
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
          <Button type='submit' className='w-full mt-4'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
