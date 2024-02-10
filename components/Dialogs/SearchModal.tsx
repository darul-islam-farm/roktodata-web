'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, jilla, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'

import { GSelect } from '../customs/GInput'
import { Button } from '../ui/button'

type TProps = {
  trigger?: string
}
export default function SearchModal({ trigger }: TProps) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (data: TSearchdata) => {
    push(
      `/search?bloodType=${data.bloodType}&jilla=${data.jilla}&religion=${data.religion}&ageFrom=${data.ageFrom}&ageTo=${data.ageTo}`
    )
    setTimeout(() => setIsOpen(false), 1000)
  }

  return (
    <AlertDialog open={isOpen}>
      <Button onClick={() => setIsOpen(true)} className='button-shadow'>
        {trigger || 'রক্ত নিন'}
      </Button>
      <AlertDialogContent className='rounded-lg'>
        <AlertDialogHeader builtin>নিকটস্থ ডোনার খুঁজুন</AlertDialogHeader>
        <AlertDialogDescription className='text-center sm:text-start'>
          রক্তের গ্রুপ ও জেলা নির্বাচনের মাধ্যমে ডোনার খুঁজুন
        </AlertDialogDescription>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              <div className='col-span-1'>
                <GSelect
                  data={bloodGroups.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  register={register}
                  label='রক্তের গ্রুপ'
                  name='bloodType'
                  message={errors.bloodType?.message}
                />
              </div>
              <div className='col-auto'>
                <GSelect
                  data={jilla.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  register={register}
                  label='জেলা'
                  name='jilla'
                  message={errors.jilla?.message}
                />
              </div>
            </div>

            <div className='grid grid-cols-3 gap-2 mt-2'>
              <div className='col-span-3 md:col-auto'>
                <GSelect
                  defaultValue='all'
                  data={[{ name: 'সকল', value: 'all' }, ...religions]}
                  register={register}
                  label='ধর্ম'
                  name='religion'
                  message={errors.religion?.message}
                />
              </div>
              <div className='col-auto'>
                <GSelect
                  defaultValue='all'
                  data={[
                    { name: 'সকল', value: 'all' },
                    ...Array.from({ length: 33 }, (i, j) => j + 18).map(
                      (item) => ({
                        name: item,
                        value: item
                      })
                    )
                  ]}
                  register={register}
                  label='বয়স(থেকে)'
                  name='ageFrom'
                  message={errors.ageFrom?.message}
                />
              </div>
              <div className='col-auto'>
                <GSelect
                  defaultValue='all'
                  data={[
                    { name: 'সকল', value: 'all' },
                    ...Array.from({ length: 33 }, (i, j) => j + 18).map(
                      (item) => ({
                        name: item,
                        value: item
                      })
                    )
                  ]}
                  register={register}
                  label='বয়স(পর্যন্ত)'
                  name='ageTo'
                  message={errors.ageTo?.message}
                />
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-2 mt-8'>
              <Button
                onClick={() => setIsOpen(false)}
                className='text-primary w-full'
                variant='outline'
              >
                Cancel
              </Button>
              <Button className='w-full' type='submit'>
                Search
              </Button>
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
