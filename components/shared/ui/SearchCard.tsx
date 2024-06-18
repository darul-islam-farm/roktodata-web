'use client'

import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, jilla, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { GSelect } from '@/components/customs/GInput'

export default function SearchCard() {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (data: TSearchdata) =>
    push(
      `/search?bloodType=${data.bloodType}&jilla=${data.jilla}&religion=${data.religion}&ageFrom=${data.ageFrom}&ageTo=${data.ageTo}`
    )

  return (
    <div className='bg-white p-4 rounded-xl'>
      <h1 className='text-center text-secondary my-3 sm:my-6'>
        ডোনার সার্চ করুন
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 sm:mb-8'>
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

        <div className='grid grid-cols-4 md:grid-cols-3 gap-2 mb-4 sm:mb-8'>
          <div className='col-span-4 md:col-auto'>
            <GSelect
              defaultValue='all'
              data={[{ name: 'সকল', value: 'all' }, ...religions]}
              register={register}
              label='ধর্ম'
              name='religion'
              message={errors.religion?.message}
            />
          </div>
          <div className='col-span-2 md:col-auto'>
            <GSelect
              defaultValue='all'
              data={[
                { name: 'সকল', value: 'all' },
                ...Array.from({ length: 33 }, (i, j) => j + 18).map((item) => ({
                  name: item,
                  value: item
                }))
              ]}
              register={register}
              label='বয়স(থেকে)'
              name='ageFrom'
              message={errors.ageFrom?.message}
            />
          </div>
          <div className='col-span-2 md:col-auto'>
            <GSelect
              defaultValue='all'
              data={[
                { name: 'সকল', value: 'all' },
                ...Array.from({ length: 33 }, (i, j) => j + 18).map((item) => ({
                  name: item,
                  value: item
                }))
              ]}
              register={register}
              label='বয়স(পর্যন্ত)'
              name='ageTo'
              message={errors.ageTo?.message}
            />
          </div>
        </div>

        <Button className='w-full sm:mb-4' type='submit'>
          Search
        </Button>
      </form>
    </div>
  )
}
