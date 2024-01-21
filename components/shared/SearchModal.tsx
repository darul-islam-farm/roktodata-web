import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, jilla } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { GSelect } from '../customs/GInput'
import { Button, buttonVariants } from '../ui/button'

export default function SearchModal() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (data: TSearchdata) => console.log('data', data)

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(buttonVariants(), 'button-shadow')}>
        রক্ত নিন
      </AlertDialogTrigger>
      <AlertDialogContent className='rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle>নিকটস্থ ডোনার খুঁজুন</AlertDialogTitle>
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
