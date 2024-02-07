'use client'

import requests from '@/services/network/http'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function RequestDialog() {
  const handleFile = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('name', 'custom_name')
    try {
      const res = await requests.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      )
      console.log('res on success', { res, isOK: res.ok })
    } catch (error) {
      console.log('error on upload', error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>
        <Button className='w-full'>আবেদন করুন</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Upload your image</AlertDialogHeader>
        <Label htmlFor='image'>Upload Image</Label>
        <Input
          type='file'
          onChange={(e) => handleFile(e.target.files![0])}
          accept='image/*'
          name='image'
          id='image'
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
