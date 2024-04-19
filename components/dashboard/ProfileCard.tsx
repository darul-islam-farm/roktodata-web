'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateUser } from '@/actions/user'
import { alldata, TAlldata } from '@/constants/schema/register'
import { genders, jilla } from '@/constants/static'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import {
  ArrowRight,
  CheckCircle,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { GInput, GSelect } from '../customs/GInput'
import Container from '../shared/Container'
import { Button } from '../ui/button'

type TProps = {
  onProfile?: boolean
  data: User
  isLoading: boolean
}
export default function ProfileCard({ onProfile, data, isLoading }: TProps) {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAlldata>({
    resolver: zodResolver(alldata),
    defaultValues: {
      name: data.name,
      identity: data.identity,
      gender: data.gender,
      religion: data.religion,
      age: data.age.toString(),
      jilla: data.jilla,
      subJilla: data.subJilla,
      thana: data.thana,
      address: data.address,
      email: data.email,
      phone: data.phone,
      phone2: data.phone2,
      password: data.password
    }
  })

  const onSubmit = async (data: TAlldata) => {
    setLoading(true)
    try {
      const res = await updateUser({ ...data, age: Number(data.age) })
      res.ok && successAlert({ body: 'তথ্যগুলো আপডেট করা হয়েছে।' })
      res.error && errorAlert({ title: 'Error Ocurred', body: res.error })
      setLoading(false)
    } catch {
      errorAlert({ title: 'Error Ocurred', body: 'Please try again later.' })
      setLoading(false)
    }
  }

  return (
    <div className='card-shadow bg-white px-2 py-4 lg:px-4 lg:py-8'>
      <h1 className='text-dark'>প্রোফাইল তথ্য</h1>
      <p className='text-litetext text font-light text-sm'>
        {onProfile
          ? 'যেকোনো ফিল্ড পরিবর্তন করে এডিট সম্পন্ন করতে পারেন।'
          : 'একাউন্টের বেসিক তথ্যগুলো এখানে দেখানো হয়েছে, বিস্তারিত দেখতে ও এডিট করতে এডিট বাটনে ক্লিক করুন।'}
      </p>
      <hr className='my-4' />
      {onProfile ? (
        <Container size='sm'>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='lg:grid grid-cols-5 gap-4'>
              <div className='col-span-1'>
                <h3 className='font-semibold text-secondary'>
                  প্রাথমিক তথ্যাদি
                </h3>
              </div>
              <div className='col-span-4 max-w-lg'>
                <GInput
                  register={register}
                  label='আপনার নাম'
                  name='name'
                  message={errors.name?.message}
                />
                <GInput
                  register={register}
                  label='আইডেন্টিটি'
                  name='identity'
                  message={errors.identity?.message}
                />
                <GSelect
                  register={register}
                  label='লিঙ্গ'
                  name='gender'
                  data={genders}
                  message={errors.gender?.message}
                />
                <GInput
                  register={register}
                  name='phone'
                  label='ফোন নম্বর'
                  message={errors.phone?.message}
                />
                <GInput
                  register={register}
                  name='phone2'
                  label='বিকল্প ফোন নম্বর'
                  message={errors.phone2?.message}
                />
              </div>
            </div>
            <hr />
            <div className='lg:grid grid-cols-5 gap-4'>
              <div className='col-span-1'>
                <h3 className='font-semibold text-secondary'>
                  ঠিকানা সম্পর্কিত
                </h3>
              </div>
              <div className='col-span-4 max-w-lg'>
                <GSelect
                  register={register}
                  name='jilla'
                  label='জেলা'
                  data={jilla.map((item) => ({ name: item, value: item }))}
                  message={errors.jilla?.message}
                />
                <GInput
                  register={register}
                  name='subJilla'
                  label='উপজেলা'
                  message={errors.subJilla?.message}
                />
                <GInput
                  register={register}
                  name='thana'
                  label='থানা'
                  message={errors.thana?.message}
                />
                <GInput
                  register={register}
                  name='address'
                  label='বিস্তারিত ঠিকানা'
                  message={errors.address?.message}
                />
              </div>
            </div>
            <hr />
            <div className='lg:grid grid-cols-5 gap-4'>
              <div className='col-span-1'>
                <h3 className='font-semibold text-secondary'>সিকিউরিটি তথ্য</h3>
              </div>
              <div className='col-span-4 max-w-lg'>
                <GInput
                  register={register}
                  name='email'
                  label='ইমেইল অ্যাড্রেস'
                  message={errors.email?.message}
                />
                <GInput
                  register={register}
                  name='password'
                  label='পাসওয়ার্ড'
                  message={errors.password?.message}
                />
              </div>
            </div>
            <Button
              disabled={isLoading || loading}
              loading={isLoading || loading}
              type='submit'
              className='mt-4'
            >
              <CheckCircle /> এডিট সম্পন্ন করুন
            </Button>
          </form>
        </Container>
      ) : (
        <div className='flex flex-col gap-3'>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>পূর্ণ নাম: </p>
              <p className='font-light text-litetext'>{data.name}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>ফোন নং: </p>
              <p className='font-light text-litetext'>{data.phone}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>ইমেইল:</p>
              <p className='font-light text-litetext'>{data.email}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>ঠিকানা:</p>
              <p className='font-light text-litetext'>{data.address}</p>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-dark'>Social Links:</p>
              <div className='flex items-center gap-3'>
                <Facebook className='size-6 rounded-full bg-secondary text-light p-1' />
                <Twitter className='size-6 rounded-full bg-secondary text-light p-1' />
                <Youtube className='size-6 rounded-full bg-secondary text-light p-1' />
              </div>
            </div>
          </div>
          <div className='text-right'>
            <Button onClick={() => push('/dashboard/donor/profile')}>
              এডিট করুন <ArrowRight height={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
