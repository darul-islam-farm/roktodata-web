'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  locationdata,
  TBasicdata,
  TCreddata,
  TLocationdata
} from '@/constants/schema/register'
import { jilla } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  MapPin,
  MapPinned
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { CInput, CSelect } from '../customs/CInput'
import { Button } from '../ui/button'

export default function RegisterLocation({
  onSubmit,
  setStep,
  data
}: {
  onSubmit: (values: TBasicdata | TLocationdata | TCreddata) => void
  setStep: Dispatch<SetStateAction<number>>
  data: any
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLocationdata>({
    resolver: zodResolver(locationdata),
    defaultValues: {
      jilla: data?.jilla,
      subJilla: data?.subJilla,
      thana: data?.thana,
      currentAddress: data?.currentAddress,
      permanentAddress: data?.permanentAddress
    }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CSelect
          label='জেলা'
          message={errors.jilla?.message}
          icon={{ icon: MapPin }}
          data={jilla.map((item) => ({ name: item, value: item }))}
          name='jilla'
          register={register}
          placeholder='আপনার জেলা নির্বাচন করুন'
        />
        <div>
          <CInput
            label='উপজেলা'
            placeholder='রংপুর সদর'
            icon={{ icon: MapPin }}
            register={register}
            name='subJilla'
            message={errors.subJilla?.message}
          />
        </div>
        <div>
          <CInput
            label='থানা'
            placeholder='কোতোয়ালী থানা'
            icon={{ icon: Landmark }}
            register={register}
            name='thana'
            message={errors.thana?.message}
          />
        </div>
        <div>
          <CInput
            label='বর্তমান ঠিকানা'
            placeholder='কলেজরোড, রংপুর সদর।'
            icon={{ icon: MapPinned }}
            register={register}
            name='currentAddress'
            message={errors.currentAddress?.message}
          />
        </div>
        <div>
          <CInput
            label='স্থায়ী ঠিকানা (optional)'
            placeholder='কলেজরোড, রংপুর সদর।'
            icon={{ icon: MapPinned }}
            register={register}
            name='permanentAddress'
            message={errors.permanentAddress?.message}
          />
        </div>
        <div className='flex items-center gap-4'>
          <Button
            onClick={() => setStep((prev) => prev - 1)}
            type='button'
            variant='outline'
            className='w-full mt-4 text-primary'
          >
            <ArrowLeft className='ml-2 h-4' />
            পূর্ববর্তী
          </Button>
          <Button type='submit' className='w-full mt-4'>
            পরবর্তী
            <ArrowRight className='ml-2 h-4' />
          </Button>
        </div>
      </div>
    </form>
  )
}
