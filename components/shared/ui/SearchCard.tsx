'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import jillas from '@/constants/jilla'
import { bloodGroups, religions } from '@/constants/static'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import MySelect from '@/components/ui/custom-select'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'

type TRequired = 'bloodType' | 'jilla'
type TData = {
  bloodType: string
  jilla: string
  religion: string
  age: string
}
export default function SearchCard() {
  const { push } = useRouter()
  const [data, setData] = useState<TData>({
    bloodType: '',
    jilla: '',
    religion: 'all',
    age: 'all'
  })
  const [subJilla, setSubJilla] = useState<string[]>([])
  const [error, setError] = useState({
    bloodType: false,
    jilla: false,
    subJilla: false
  })
  const AllJillas: TJilla = jillas

  const handleData = (name: string, value: string) =>
    setData((prev) => ({ ...prev, [name]: value }))

  console.log('sub jilla', subJilla)
  const handleToggler = (value: string) => {
    setSubJilla((currentSubJilla) => {
      if (currentSubJilla.includes(value)) {
        // If the value is already in the array, remove it
        return currentSubJilla.filter((item) => item !== value)
      } else {
        // If the value is not in the array, add it
        return [...currentSubJilla, value]
      }
    })
  }
  const onSubmit = () => {
    Object.keys(error).forEach((key) => {
      if (!data[key as TRequired])
        setError((prev) => ({ ...prev, [key]: true }))
    })
    if (!data.bloodType)
      return setError((prev) => ({ ...prev, bloodType: true }))
    if (!data.jilla) return setError((prev) => ({ ...prev, jilla: true }))
    if (!subJilla.length)
      return setError((prev) => ({ ...prev, subJilla: true }))

    push(
      `/search?bloodType=${data.bloodType}&jilla=${data.jilla}&subJilla=${subJilla}&religion=${data.religion}&age=${data.age}`
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
                setSubJilla([])
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
            <Select>
              <SelectTrigger>
                {subJilla.length ? `${subJilla.length} টি` : 'Select'}
              </SelectTrigger>
              <SelectContent>
                {jillas.map((jilla) => {
                  const expectedJilla = jilla.jilla === data.jilla
                  return expectedJilla
                    ? jilla.subJilla.map((item, idx) => (
                        <div
                          className='flex items-center cursor-pointer hover:bg-slate-100 rounded pl-2'
                          key={idx}
                        >
                          <Checkbox
                            id={item}
                            onCheckedChange={() => handleToggler(item)}
                            // checked={data.subJilla.includes(item)}
                          />
                          <label
                            htmlFor={item}
                            className='text-sm font-medium cursor-pointer size-full p-2 hover:bg-slate-100 rounded pl-3'
                          >
                            {item}
                          </label>
                        </div>
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
