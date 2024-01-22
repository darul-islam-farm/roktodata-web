'use client'

import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, jilla } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { GSelect } from '../customs/GInput'
import { Button, buttonVariants } from '../ui/button'

type TProps = {
  trigger?: string
}
export default function SearchModal({ trigger }: TProps) {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (data: TSearchdata) =>
    push(`/search?bloodType=${data.bloodType}&jilla=${data.jilla}`)

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(buttonVariants(), 'button-shadow')}>
        {trigger || 'রক্ত নিন'}
      </AlertDialogTrigger>
      <AlertDialogContent className='rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            <span>নিকটস্থ ডোনার খুঁজুন</span>
            <AlertDialogCancel className='text-dark p-0 border-none'>
              <X className='-mt-8' />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            রক্তের গ্রুপ ও জেলা নির্বাচনের মাধ্যমে ডোনার খুঁজুন
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
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
              <div className='col-span-1 sm:col-span-2'>
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

            <div className='flex items-center justify-end gap-2 mt-8'>
              <AlertDialogCancel
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-primary'
                )}
              >
                Cancel
              </AlertDialogCancel>
              {trigger ? (
                <AlertDialogCancel
                  type='submit'
                  className={cn(buttonVariants())}
                >
                  Search
                </AlertDialogCancel>
              ) : (
                <Button className='mt-2 sm:mt-0' type='submit'>
                  Search
                </Button>
              )}
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
