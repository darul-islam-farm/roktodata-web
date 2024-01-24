'use client'

import { useRouter } from 'next/navigation'
import { searchdata, TSearchdata } from '@/constants/schema/others'
import { bloodGroups, jilla, religions } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { GSelect } from '@/components/customs/GInput'

export default function Filterbar({ data }: { data: TSearchdata }) {
  const { push } = useRouter()
  const { bloodType, jilla: jillaParams, ageFrom, ageTo, religion } = data
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSearchdata>({
    resolver: zodResolver(searchdata)
  })

  const onSubmit = (params: TSearchdata) =>
    push(
      `/search?bloodType=${params.bloodType}&jilla=${params.jilla}&religion=${params.religion}&ageFrom=${params.ageFrom}&ageTo=${params.ageTo}`
    )
  return (
    <div className='bg-secondary p-2 md:p-4 rounded-xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <div className='col-span-1'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={bloodType}
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
              theme='dark'
              size='sm'
              defaultValue={jillaParams}
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
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={religion}
              data={[{ name: 'সকল', value: 'all' }, ...religions]}
              register={register}
              label='ধর্ম'
              name='religion'
              message={errors.religion?.message}
            />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2 mt-2'>
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={ageFrom}
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
          <div className='col-auto'>
            <GSelect
              theme='dark'
              size='sm'
              defaultValue={ageTo}
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
          <div className='col-auto self-end'>
            <Button
              size='sm'
              className='w-full mb-[2px] bg-white text-primary'
              type='submit'
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
