/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createDonation } from '@/actions/donor'
import { errorAlert, successAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type TPorps = {
  open: boolean
  setOpen: Function
  appId: string
}

export default function CompleteDialog({ open, setOpen, appId }: TPorps) {
  const { back } = useRouter()

  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [fileImage, setFileImage] = useState<File | any>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (file?: File) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleAction = async () => {
    setLoading(true)
    try {
      if (image) {
        const file = new FormData()
        file.append('files', fileImage)
        const res = await requests.post('/api/uploadthing/upload', file)
        if (res.ok && res.data && res.data[0]) {
          const donation = await createDonation(appId, res.data[0])
          if (donation.ok) {
            successAlert({ title: 'সফল হয়েছে' })
            return back()
          }
        }
      }

      const donation = await createDonation(appId)
      if (donation.ok) {
        successAlert({ title: 'সফল হয়েছে' })
        return back()
      }

      setLoading(false)
      return errorAlert({ body: 'ইরর হয়েছে, আবার চেষ্টা করুন।' })
    } catch {
      setLoading(false)
      return errorAlert({ body: 'ইরর হয়েছে, আবার চেষ্টা করুন।' })
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader builtin>একটি ছবি যোগ করুন</AlertDialogHeader>
        <AlertDialogDescription>
          এই ডোনেশনটি ডোনেশন হিস্ট্রিসহ অন্যান্য স্থানে পোস্ট করা হবে। চাইলে
          একটি কভার ফোটো আপলোড করতে পারেন অথবা সরাসরি
          <span className='text-secondary font-semibold px-1'>Submit</span>{' '}
          করুন।
        </AlertDialogDescription>
        <div>
          <Label htmlFor='image'>ছবি বাছাই করুন </Label>
          <Input
            disabled={loading}
            onChange={(e) => {
              setFileImage(e.target.files?.[0])
              handleImageChange(e.target.files?.[0])
            }}
            type='file'
            id='image'
            accept='image/*'
          />
        </div>
        <div
          className={cn('mt-4 flex justify-center', image ? 'flex' : 'hidden')}
        >
          <img
            src={image as string}
            alt='preview'
            height={120}
            width={120}
            className='border border-secondary rounded shadow-lg'
          />
        </div>
        <AlertDialogFooter className='mt-4'>
          <Button
            disabled={loading}
            onClick={() => setOpen(false)}
            variant='primarysubtle'
          >
            Cancel
          </Button>
          <Button loading={loading} onClick={handleAction} variant='secondary'>
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
