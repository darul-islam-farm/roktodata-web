'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createHospital } from '@/actions/mod'
import { hospitalData, THospitalData } from '@/constants/schema/others'
import { jilla } from '@/constants/static'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { GInput, GSelect, GTextarea } from '@/components/customs/GInput'
import Container from '@/components/shared/Container'

export default function AddHospital() {
  const { back } = useRouter()
  const [doctors, setDoctors] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<THospitalData | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<THospitalData>({
    resolver: zodResolver(hospitalData)
  })

  const handleAddDoctor = () => {
    if (!input) return
    setDoctors((prev) => [...prev, input])
    setInput('')
  }
  const handleDeleteDoctor = (key: number) => {
    const allDoctors = [...doctors]
    allDoctors.splice(key, 1)
    setDoctors([...allDoctors])
  }

  const onSubmit = (data: THospitalData) => {
    setFormData(data)
    setIsOpen(true)
  }
  const handleCreateHospital = async () => {
    if (!formData || !doctors.length) return

    try {
      const res = await createHospital(formData)
      if (res.ok) {
        successAlert({ body: 'সফলভাবে তথ্যসমূহ ক্রিয়েট করা হয়েছে।' })
        back()
      }
      res.error && errorAlert({ body: 'ইরর হয়েছে, আবার চেষ্টা করুন।' })
    } catch {
      errorAlert({ body: 'ইরর হয়েছে, আবার চেষ্টা করুন।' })
    }
  }

  return (
    <Container size='sm'>
      <h1 className='text-center text-primary'>নিকটস্থ হাসপাতাল অ্যাড করুন</h1>
      <hr className='mt-2 mb-4' />
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
        <GInput
          register={register}
          label='হাসপাতালের নাম'
          name='name'
          message={errors.name?.message}
        />
        <GInput
          register={register}
          label='মোবাইল নং'
          name='phone'
          type='tel'
          message={errors.phone?.message}
        />
        <GInput
          register={register}
          label='ইমেইল অ্যাড্রেস'
          name='email'
          message={errors.email?.message}
        />
        <GSelect
          register={register}
          label='জেলা'
          name='jilla'
          data={jilla.map((item) => ({ name: item, value: item }))}
          message={errors.jilla?.message}
        />
        <GInput
          register={register}
          label='উপজেলা'
          name='subJilla'
          message={errors.subJilla?.message}
        />
        <GInput
          register={register}
          label='থানা'
          name='thana'
          message={errors.thana?.message}
        />
        <GTextarea
          register={register}
          label='বিস্তারিত ঠিকানা'
          name='address'
          message={errors.address?.message}
        />
        <GInput
          register={register}
          label='সময়সূচী'
          name='open'
          placeholder='বৃহসঃ - শনি, সকাল ৮টা থেকে রাত ১০টা।'
          message={errors.open?.message}
        />

        <input
          type='submit'
          value='Submit'
          className=' cursor-pointer h-10 bg-secondary py-2 px-4 rounded text-white font-medium shadow-lg'
        />
      </form>

      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader builtin>হাসপাতাল অ্যাড করুন</AlertDialogHeader>
          <div className='grid gap-3'>
            <Label htmlFor='doctors'>ডাক্তারের তালিকা</Label>
            <input
              value={input}
              onChange={({ target: { value } }) => setInput(value)}
              className='input-style'
              type='text'
              placeholder='ডাক্তারের নাম, মেজরের নাম'
            />
            {!doctors.length && (
              <span className='text-red-500 text-xs -mt-2 ml-1'>
                ডাক্তারের তালিকা উল্লেখ করুন।
              </span>
            )}
            <div>
              <button
                onClick={handleAddDoctor}
                className='bg-success px-4 py-2 rounded shadow-lg text-white font-medium'
              >
                add doctor
              </button>
            </div>
            {doctors.map((item, key) => (
              <div
                className='mb-1 bg-secondary/10 h-10 overflow-hidden hover:bg-secondary/30 max-w-fit pl-4 rounded-lg shadow flex items-center gap-8'
                key={key}
              >
                <span className=''>{item}</span>
                <X
                  onClick={() => handleDeleteDoctor(key)}
                  className='bg-red-500 h-full w-10 text-white cursor-pointer'
                  strokeWidth={1.2}
                />
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateHospital} variant='secondarysubtle'>
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  )
}
