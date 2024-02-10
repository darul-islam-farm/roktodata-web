'use client'

import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitApp } from '@/actions/others'
import {
  appointmentSchema,
  TAppointmentData
} from '@/constants/schema/appointment'
import { errorAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, PlusCircle, SendHorizonal, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GTextarea } from '@/components/customs/GInput'
import Container from '@/components/shared/Container'

type TInput = {
  id: number
  file: File | null
}

export default function Application() {
  const searchparams = useSearchParams()
  const [imageInputs, setImageInputs] = useState<TInput[]>([
    { id: 0, file: null }
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [uploadedData, setUploadedData] = useState<String[] | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAppointmentData>({
    resolver: zodResolver(appointmentSchema)
  })

  const handleDelete = (id: number) =>
    setImageInputs((prevInputs) =>
      prevInputs.filter((input) => input.id !== id)
    )
  const addImageInput = () => {
    setImageInputs([...imageInputs, { id: count, file: null }])
    setCount((prev) => prev + 1)
  }
  const handleImageOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setImageInputs((prev) => {
        return prev.map((input) => {
          if (input.id === id) {
            return { ...input, file }
          } else {
            return input
          }
        })
      })
    }
  }
  const handleImageUpload = (formData: FormData) => {
    setLoading(true)
    uploadImage(formData)
  }
  const uploadImage = async (formData: FormData) => {
    try {
      const uploadImagesRes = await requests.post(
        '/api/uploadthing/upload',
        formData
      )
      if (uploadImagesRes.ok) {
        setUploadedData(uploadImagesRes.data)
        setIsOpen(false)
      } else throw new Error('something went wrong!')
      setLoading(false)
    } catch (error) {
      console.log('error on uploading', error)
      setIsOpen(false)
      setLoading(false)
      errorAlert({
        title: 'ইরর হয়েছে',
        body: 'ছবিগুলো আপলোড হয়নি। আবার চেষ্টা করুন।'
      })
    }
  }

  console.log('upload data', uploadedData)

  const onSubmit = async (inputData: TAppointmentData) => {
    if (!uploadedData) {
      errorAlert({
        title: 'ছবি আপলোড করা হয়নি',
        body: 'সংশ্লিষ্ট ডকুমেন্টস এর ছবি ছাড়া আবেদন সম্পূর্ণ হবে না।',
        timer: 5000
      })
      return
    }
    console.log('input data', inputData)
  }
  const submitApplication = async (images: string[]) => {
    // const fields = { ...data, images }
    // try {
    //   const res = await submitApp(fields)
    //   console.log('res ooon submitionnnn', res)
    // } catch (error) {
    //   console.log('error', error)
    //   errorAlert({
    //     title: 'ইরর হয়েছে',
    //     body: 'আবার চেষ্টা করুন।'
    //   })
    // }
  }

  return (
    <div>
      <Container size='sm' className='pb-40'>
        <h1 className='text-center mt-8'>আবেদন ফর্ম</h1>
        <hr />
        <form
          className='flex flex-col gap-2 my-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <GTextarea
            compact
            register={register}
            label='হাসপাতালের তথ্য'
            message={errors.hospitalInfo?.message}
            name='hospitalInfo'
          />
          <GTextarea
            compact
            register={register}
            label='বর্তমান ঠিকানা'
            message={errors.address?.message}
            name='address'
          />
          <GTextarea
            compact
            register={register}
            label='হাসপাতালের তথ্য'
            message={errors.additionalInfo?.message}
            name='additionalInfo'
            optional
          />

          <div className='mt-24 flex sm:justify-end'>
            <Button
              type='submit'
              className={loading ? 'w-full sm:w-28' : 'w-full sm:w-auto'}
              loading={loading}
              disabled={loading}
            >
              আবেদন সম্পূর্ণ করুন <SendHorizonal className='size-4' />
            </Button>
          </div>
        </form>

        <div className='-mt-40'>
          <Button
            type='button'
            variant='secondarysubtle'
            className='w-full'
            size='lg'
            onClick={() => setIsOpen(true)}
          >
            <ImagePlus /> ডকুমেন্টস এর ছবি আপলোড করুন
          </Button>
        </div>

        <AlertDialog open={isOpen}>
          <AlertDialogContent className='max-h-[600px] overflow-y-auto'>
            <AlertDialogHeader builtin>ছবি আপলোড করুন</AlertDialogHeader>
            <AlertDialogDescription>
              রোগীর প্রেসক্রিপশন, ব্লাড টেস্ট রিপোর্ট ইত্যাদি সংশ্লিষ্ট
              কাগজপত্রের স্পষ্ট ছবি আপলোড করুন। সর্বোচ্চ ৫টি ও প্রতিটি ছবি
              সর্বোচ্চ 4mb সাইজ।{' '}
            </AlertDialogDescription>
            <form action={handleImageUpload}>
              {imageInputs.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-2 '
                >
                  <Input
                    compact
                    name='files'
                    required
                    type='file'
                    accept='image/*'
                    className='mb-4'
                    disabled={loading}
                    onChange={(e) => handleImageOnChange(e, item.id)}
                  />
                  {imageInputs.length !== 1 && (
                    <X
                      onClick={() => handleDelete(item.id)}
                      className=' bg-red-600 text-white rounded-full px-1 cursor-pointer hover:bg-secondary mb-4'
                      strokeWidth={3}
                    />
                  )}
                </div>
              ))}
              <Button
                disabled={imageInputs.length === 5 || loading}
                size='sm'
                type='button'
                className=' bg-success'
                onClick={addImageInput}
              >
                <PlusCircle className='size-5' />
                আরো ছবি যোগ করুন
              </Button>

              <AlertDialogFooter className='gap-3 sm:gap-0 flex-col-reverse mt-4'>
                <Button
                  disabled={loading}
                  onClick={() => {
                    if (window.confirm('আপনার সকল ছবি মুছে যাবে।')) {
                      setImageInputs([{ id: 0, file: null }])
                      setIsOpen(false)
                    }
                  }}
                  variant='outline'
                  type='button'
                  className='text-primary disabled:text-litetext'
                >
                  বন্ধ করুন
                </Button>
                <Button
                  type='submit'
                  variant='secondary'
                  className={loading ? 'w-full sm:w-24' : 'w-full sm:w-auto'}
                  loading={loading}
                  disabled={loading}
                >
                  আপলোড করুন
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </div>
  )
}
