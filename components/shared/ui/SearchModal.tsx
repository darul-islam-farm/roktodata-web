'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, jilla, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

import { GSelect } from '../../customs/GInput'
import { Button } from '../../ui/button'

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
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen}>
      <Button onClick={() => setIsOpen(true)} className='button-shadow'>
        {trigger || 'রক্ত নিন'}
      </Button>
      <AlertDialogContent className='rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between cursor-auto'>
            <span>নিকটস্থ ডোনার খুঁজুন</span>
            <AlertDialogCancel className='text-dark p-0 border-none'>
              <X
                className='-mt-8 hover:bg-extralight'
                onClick={() => setIsOpen(false)}
              />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            রক্তের গ্রুপ ও জেলা নির্বাচনের মাধ্যমে ডোনার খুঁজুন
          </AlertDialogDescription>
        </AlertDialogHeader>
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

            <div className='flex items-center justify-end gap-2 mt-8'>
              <Button
                onClick={() => setIsOpen(false)}
                className='text-primary'
                variant='outline'
              >
                Cancel
              </Button>
              <Button className='mt-2 sm:mt-0' type='submit'>
                Search
              </Button>
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
