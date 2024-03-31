'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  checkAppointmentAvailablity,
  createAppointment,
  getUserInfo
} from '@/actions/others'
import {
  appointmentSchema,
  TAppointmentData
} from '@/constants/schema/appointment'
import {
  confirmAlert,
  errorAlert,
  successAlert
} from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  ImagePlus,
  PlusCircle,
  SendHorizonal,
  X
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GInput, GTextarea } from '@/components/customs/GInput'
import Container from '@/components/shared/Container'

type TInput = {
  id: number
  file: File | null
}
type TReceiverStatus = {
  id: string
  profileStatus: TStatus | null
  requestStatus: TUserRequestStatus | null
  errorStatus: boolean
}

export default function Application() {
  const searchparams = useSearchParams()
  const [userInfo, setUserInfo] = useState<TReceiverStatus>({
    id: '',
    profileStatus: null,
    requestStatus: null,
    errorStatus: false
  })
  const donor = searchparams.get('donor') as string
  const receiver = searchparams.get('receiver') as string
  const { replace } = useRouter()
  const [imageInputs, setImageInputs] = useState<TInput[]>([
    { id: 0, file: null }
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<
    (string | ArrayBuffer | null)[]
  >([])

  let formStatus =
    userInfo.profileStatus === 'PENDING' ||
    userInfo.requestStatus === 'REQUESTED' ||
    userInfo.errorStatus

  useEffect(() => {
    const getData = async () => {
      const { error, data } = await getUserInfo(receiver)
      if (error) {
        setUserInfo((prev) => ({ ...prev, errorStatus: true }))
        errorAlert({ title: 'ইরর হয়েছে', body: error })
      }
      if (data) setUserInfo(data)
    }
    getData()
  }, [receiver])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAppointmentData>({
    resolver: zodResolver(appointmentSchema)
  })

  const handleDeleteImage = (id: number) =>
    setImageInputs((prevInputs) =>
      prevInputs.filter((input) => input.id !== id)
    )
  const setImageState = () => {
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
  const handleParseImage = () => {
    setIsOpen(false)

    const updatedImages = imageInputs.map((input) => {
      const reader = new FileReader()
      reader.readAsDataURL(input.file as File)
      return new Promise<string | ArrayBuffer | null>((resolve) => {
        reader.onload = () => {
          resolve(reader.result)
        }
      })
    })

    Promise.all(updatedImages).then((images) => {
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...images.filter((image) => !!image)
      ])
    })
  }
  const uploadImage = async () => {
    const imageData = new FormData()
    if (imageInputs[0].file) {
      imageInputs.forEach((item) => {
        const file = item.file
        if (file instanceof File) {
          imageData.append('files', file)
        }
      })
    }
    try {
      const uploadImagesRes = await requests.post(
        '/api/uploadthing/upload',
        imageData
      )
      if (uploadImagesRes.ok) {
        return uploadImagesRes.data
      } else throw new Error('something went wrong!')
    } catch (error) {
      setLoading(false)
      errorAlert({
        title: 'ইরর হয়েছে',
        body: 'ছবিগুলো আপলোড হয়নি। আবার চেষ্টা করুন।'
      })
    }
  }

  const onSubmit = async (inputData: TAppointmentData) => {
    if (imageInputs.length === 1 && !imageInputs[0].file) {
      return errorAlert({
        title: 'ছবি আপলোড করা হয়নি',
        body: 'সংশ্লিষ্ট ডকুমেন্টস এর ছবি ছাড়া আবেদন সম্পূর্ণ হবে না।',
        timer: 5000
      })
    }
    setLoading(true)
    try {
      const check = await checkAppointmentAvailablity(donor, userInfo.id)
      if (check.error) {
        setLoading(false)
        return errorAlert({
          body: check.error
        })
      }

      const images = await uploadImage()
      if (!images) return
      const fields = {
        ...inputData,
        images,
        donor,
        receiver: userInfo.id,
        scheduledAt: new Date()
      }
      const res = await createAppointment(fields)
      if (res.ok) {
        successAlert({
          body: 'আবেদনটি অ্যাডমিন চেকিংয়ে পাঠানো হয়েছে। অ্যাপ্রুভ করা হলে জানানো হবে।'
        })
        replace('/')
      }

      if (res.error)
        errorAlert({
          title: 'ইরর হয়েছে',
          body: res.error
        })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      errorAlert({
        title: 'ইরর হয়েছে',
        body: 'আবার চেষ্টা করুন।'
      })
    }
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
          {formStatus && (
            <Alert variant='info' className='mb-8'>
              <AlertCircle className='size-6' />
              <AlertTitle>গুরুত্বপূর্ণ তথ্য</AlertTitle>
              <AlertDescription>
                {userInfo.profileStatus === 'PENDING' &&
                  'আপনার পূর্বের ফর্ম তথ্যগুলো রিভিউ করা হচ্ছে। অ্যাপ্রুভ করা হলে জানিয়ে দেয়া হবে। তখন নিম্নোক্ত ফর্মটি পূরণ করে আবেদন সম্পূর্ণ করতে পারবেন।'}
                {userInfo.requestStatus === 'REQUESTED' &&
                  'আপনি ইতোমধ্যে একটি আবেদন করেছেন। সেটি রিভিউ করা হলে আবার আবেদন করতে পারবেন।'}
              </AlertDescription>
            </Alert>
          )}
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
          <GInput
            type='datetime-local'
            register={register}
            label='তারিখ ও সময়'
            name='scheduledAt'
            message={errors.scheduledAt?.message}
          />
          <GTextarea
            compact
            register={register}
            label='অন্যান্য তথ্য'
            message={errors.additionalInfo?.message}
            name='additionalInfo'
            optional
          />

          <div className='mt-24 flex sm:justify-end'>
            <Button
              shadow={!loading && !formStatus}
              type='submit'
              className={loading ? 'w-full sm:w-28' : 'w-full sm:w-auto'}
              loading={loading}
              disabled={loading || formStatus}
            >
              আবেদন সম্পূর্ণ করুন <SendHorizonal className='size-4' />
            </Button>
          </div>
        </form>

        <div className='-mt-40'>
          <Button
            type='button'
            variant='secondarysubtle'
            className='w-full shadow'
            size='lg'
            disabled={loading || formStatus}
            onClick={() =>
              imageInputs[0].file
                ? confirmAlert({
                    title: 'ডিলেট নোটিস',
                    body: `আপনি ইতোমধ্যে ${imageInputs.length} টি ছবি সিলেক্ট করেছেন। নতুন করে সিলেক্ট করলে পূর্বের সব সিলেকশন বাতিল হয়ে যাবে।`,
                    confirm: 'এগিয়ে যান',
                    cancel: 'বাতিল',
                    precom: () => {
                      setIsOpen(true)
                      setImageInputs([{ id: 0, file: null }])
                      setSelectedImages([])
                    }
                  })
                : setIsOpen(true)
            }
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
            <form action={handleParseImage}>
              {imageInputs.map((item, idx) => (
                <div
                  key={idx}
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
                      onClick={() => handleDeleteImage(item.id)}
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
                className=' bg-success/10 text-success shadow'
                onClick={setImageState}
              >
                <PlusCircle className='size-5' />
                আরো ছবি যোগ করুন
              </Button>

              <AlertDialogFooter className='gap-3 sm:gap-0 flex-col-reverse mt-4'>
                <Button
                  disabled={loading}
                  onClick={() => {
                    if (window.confirm('সিলেক্টেড সকল ছবি মুছে যাবে।')) {
                      setImageInputs([{ id: 0, file: null }])
                      setSelectedImages([])
                      setIsOpen(false)
                    }
                  }}
                  variant='outline'
                  type='button'
                  className='text-primary disabled:text-litetext'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='secondary'
                  className='w-full sm:w-auto'
                >
                  Confirm
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>

        {/** @TODO Handle image preview layout */}
        {selectedImages.length ? (
          <div className='mt-28'>
            <h1>Image Preview</h1>
            <hr className='mb-4' />
            <div className='image-row'>
              {selectedImages.map((item, idx) => (
                <div key={idx} className='image-column'>
                  {item && (
                    <Image
                      src={item.toString()}
                      alt='preview images'
                      width={300}
                      height={250}
                      className='w-full img'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  )
}
