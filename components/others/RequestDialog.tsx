'use client'

import '@uploadthing/react/styles.css'

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
  const uploadFile = async (file: any) => {
    const data = new FormData()
    data.append('file', file)
    try {
      const res = await requests.post('/api/uploadthing/upload', data)
      console.log('res upload', res)
    } catch (error) {
      console.log('error on upload', error)
    }
  }

  const handleDelete = async () => {
    const fileKeys = 'f67ef792-07bc-4d56-9281-f41e5b92309e-b368l7.png'
    try {
      const res = await fetch(`/api/uploadthing/delete?key=${fileKeys}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      console.log('result', result)
    } catch (error) {
      alert('error ocurred!')
      console.log('error', error)
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
          id='image'
          type='file'
          onChange={(e) => uploadFile(e.target.files?.[0])}
        />
        <Button onClick={handleDelete}>Delete image</Button>
      </AlertDialogContent>
    </AlertDialog>
  )
}
