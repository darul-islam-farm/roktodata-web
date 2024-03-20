'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { declineAppointment } from '@/actions/admin'
import { errorAlert, successAlert } from '@/services/alerts/alerts'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
import { Label } from '../ui/label'

type TPorps = {
  open: boolean
  setOpen: Function
  appId: string
}

export default function CancelDialog({ open, setOpen, appId }: TPorps) {
  const { back } = useRouter()

  const [checked, setChecked] = useState(false)
  const [msg, setMsg] = useState('')

  const handleAction = async () => {
    if (!checked && !msg) {
      alert('যেকোনো একটি ফিল্ড পূরণ করুন।')
      return
    }
    const res = await declineAppointment(
      appId,
      'CANCELED',
      checked ? 'আমি ইতোমধ্যে অন্য ডোনেশন রিকুয়েস্ট কনফার্ম করেছি।' : msg
    )
    if (res.ok) {
      successAlert({ body: 'রিকুয়েস্টটি ক্যান্সেল করা হয়েছে।' })
      return back()
    }
    if (res.error) return errorAlert({ body: 'ইরর হয়েছে, আবার চেষ্টা করুন।' })
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader builtin>ক্যান্সেল করার কারণ লিখুন</AlertDialogHeader>
        <div className='grid gap-4'>
          <div className='flex items-center gap-2 ml-1'>
            <input
              onChange={(e) => {
                setMsg('')
                setChecked(e.target.checked)
              }}
              checked={checked}
              type='checkbox'
              id='check'
              className='size-5'
            />
            <Label htmlFor='check'>
              আমি ইতোমধ্যে অন্য ডোনেশন রিকুয়েস্ট কনফার্ম করেছি।
            </Label>
          </div>
          <p>অথবা</p>
          <Label htmlFor='cancelMessage'>কারণ</Label>
          <textarea
            onClick={() => setChecked(false)}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={3}
            id='cancelMessage'
            name='cancelMessage'
            className='border rounded-lg border-text p-2'
          />
        </div>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)} variant='primarysubtle'>
            Cancel
          </Button>
          <Button onClick={handleAction} variant='secondary'>
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
