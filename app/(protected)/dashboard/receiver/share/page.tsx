'use client'

import { useState } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { postForum } from '@/actions/forum'
import { errorAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import useAsync from '@/lib/useAsync'
import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/input'
import { GTextarea } from '@/components/customs/GInput'

const forumSchema = z.object({
  body: z.string().min(5, 'আপনার কিছু অভিব্যক্তি প্রকাশ করুন')
})
type TForumdata = z.infer<typeof forumSchema>

export default function ShareDonation() {
  const { back } = useRouter()
  const [image, setImage] = useState<File | undefined>()
  const [loading, setLoading] = useState(false)
  const [isAnon, setIsAnon] = useState(false)
  const donationId = useSearchParams().get('donationId')
  const { data: session } = useSession()

  const { data, error } = useAsync(
    `/api/donations/get-donation?donationId=${donationId}`,
    requests.get
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TForumdata>({
    resolver: zodResolver(forumSchema)
  })

  const onSubmit = async (value: TForumdata) => {
    setLoading(true)
    if (image instanceof File) {
      const imageData = new FormData()
      imageData.append('files', image)
      try {
        const uploadImagesRes = await requests.post(
          '/api/uploadthing/upload',
          imageData
        )
        if (uploadImagesRes.ok) {
          await handlePost(value.body, uploadImagesRes.data[0])
        }
      } catch {
        errorAlert({
          title: 'ইরর হয়েছে',
          body: 'ছবিটি আপলোড হয়নি, আবার চেষ্টা করুন'
        })
      }
      setLoading(false)
    } else handlePost(value.body)
  }
  const handlePost = async (body: string, imageUrl?: string) => {
    const forumPost: Partial<TForum> = {
      title: `${
        isAnon ? 'Unnamed User' : data.donation.receiver.user.name
      } রক্ত পেলেন ${data.donation.donor.user.name} থেকে`,
      body,
      image: imageUrl,
      anonymous: isAnon,
      authorId: session?.user.userId
    }
    try {
      const res = await postForum(forumPost, data.donation.id, true)
      if (res.ok) back()
    } catch {
      errorAlert({
        title: 'ইরর হয়েছে',
        body: 'আবার চেষ্টা করুন'
      })
    }
    setLoading(false)
  }

  if (error || data?.donation.shared) return notFound()

  return (
    <div>
      <h1>অভিজ্ঞতা শেয়ার করুন</h1>
      <p className='light-text'>
        আপনার রক্তদানের অভিজ্ঞতাটি শেয়ার করুন। আমরা আপনার অভিজ্ঞতা আমাদের ব্লগে
        প্রকাশ করতে চাই আপনার নামসহ অথবা নাম প্রকাশ ছাড়াই।
      </p>

      <div className='mt-4 max-w-xl'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GTextarea
            name='body'
            message={errors.body?.message}
            register={register}
            label='মন্তব্য লিখুন'
          />

          <div className='my-4'>
            <FileInput
              fileName={image?.name}
              accept='image/*'
              disabled={loading}
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>

          <div className='my-4 flex items-center gap-2 text-sm lg:text-base'>
            <input
              onChange={({ target: { checked } }) => setIsAnon(!checked)}
              type='radio'
              defaultChecked
              id='name'
              name='privacy'
            />
            <label htmlFor='name'>আমার নামসহ পোস্ট করুন</label>
            <input
              onChange={({ target: { checked } }) => setIsAnon(checked)}
              type='radio'
              id='withoutname'
              name='privacy'
            />
            <label htmlFor='withoutname'>নাম ছাড়া পোস্ট করুন</label>
          </div>
          <Button
            loading={loading}
            variant='secondary'
            type='submit'
            className='w-full '
          >
            পোস্ট করুন
          </Button>
        </form>
      </div>
    </div>
  )
}
