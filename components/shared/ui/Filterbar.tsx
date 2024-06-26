'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import jillas from '@/constants/jilla'
import { bloodGroups, religions } from '@/constants/static'

import { Button } from '@/components/ui/button'
import MySelect from '@/components/ui/custom-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select'

type TRequired = 'bloodType' | 'jilla' | 'subJilla'

export default function Filterbar() {
  const { push } = useRouter()
  const [data, setData] = useState({
    bloodType: '',
    jilla: '',
    subJilla: '',
    religion: 'all',
    age: 'all'
  })
  const [error, setError] = useState({
    bloodType: false,
    jilla: false,
    subJilla: false
  })
  const AllJillas: TJilla = jillas

  const handleData = (name: string, value: string) =>
    setData((prev) => ({ ...prev, [name]: value }))

  const onSubmit = () => {
    Object.keys(error).forEach((key) => {
      if (!data[key as TRequired])
        setError((prev) => ({ ...prev, [key]: true }))
    })
    if (!data.bloodType)
      return setError((prev) => ({ ...prev, bloodType: true }))
    if (!data.jilla) return setError((prev) => ({ ...prev, jilla: true }))
    if (!data.subJilla) return setError((prev) => ({ ...prev, subJilla: true }))

    push(
      `/search?bloodType=${data.bloodType}&jilla=${data.jilla}&subJilla=${data.subJilla}&religion=${data.religion}&age=${data.age}`
    )
  }

  return (
    <div className='bg-white p-4 rounded-xl'>
      <h1 className='text-center text-secondary my-3 sm:my-6'>
        ডোনার সার্চ করুন
      </h1>

      <div className='grid gap-4'>
        <div>
          <MySelect
            name='bloodType'
            label='রক্তের গ্রুপ'
            value={data.bloodType}
            setValue={handleData}
            data={bloodGroups.map((item) => ({ name: item, value: item }))}
            onChange={() => setError((prev) => ({ ...prev, bloodType: false }))}
          />
          {error.bloodType && (
            <p className='text-red-500 text-xs font-medium mt-1'>
              রক্তের গ্রুপ নির্বাচন করুন
            </p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <MySelect
              onChange={() => {
                setData((prev) => ({ ...prev, subJilla: '' }))
                setError((prev) => ({ ...prev, jilla: false }))
              }}
              name='jilla'
              label='জেলা'
              value={data.jilla}
              setValue={handleData}
              data={AllJillas.map((item) => ({
                name: item.jilla,
                value: item.jilla
              }))}
            />
            {error.jilla && (
              <p className='text-red-500 text-xs font-medium mt-1'>
                জেলা নির্বাচন করুন
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-1 text-sm'>উপজেলা</p>
            <Select
              value={data.subJilla}
              onValueChange={(item) => {
                handleData('subJilla', item)
                setError((prev) => ({ ...prev, subJilla: false }))
              }}
            >
              <SelectTrigger>{data.subJilla || 'Select'}</SelectTrigger>
              <SelectContent>
                {jillas.map((jilla) => {
                  const expectedJilla = jilla.jilla === data.jilla
                  return expectedJilla
                    ? jilla.subJilla.map((item, idx) => (
                        <SelectItem key={idx} value={item}>
                          {item}
                        </SelectItem>
                      ))
                    : []
                })}
              </SelectContent>
            </Select>
            {error.subJilla && (
              <p className='text-red-500 text-xs font-medium mt-1'>
                উপজেলা নির্বাচন করুন
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <MySelect
            name='religion'
            label='ধর্ম'
            defaultValue='all'
            value={data.religion}
            setValue={handleData}
            data={[{ name: 'সকল', value: 'all' }, ...religions]}
          />
          <MySelect
            name='age'
            defaultValue='all'
            label='বয়স'
            value={data.age}
            setValue={handleData}
            data={ageRenges}
          />
        </div>

        <Button className='w-full sm:mb-4' onClick={onSubmit}>
          Search
        </Button>
      </div>
    </div>
  )
}

const ageRenges = [
  { name: 'সকল', value: 'all' },
  { name: '18-25', value: '18-25' },
  { name: '26-35', value: '26-35' },
  { name: '36-45', value: '36-45' },
  { name: '46-55', value: '46-55' }
]
