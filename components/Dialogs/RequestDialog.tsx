'use client'

import { useState } from 'react'
import { createAppointment } from '@/actions/others'
import {
  appointmentSchema,
  TAppointmentData
} from '@/constants/schema/appointment'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { GTextarea } from '../customs/GInput'
import UploadDocuments from '../others/UploadDocuments'
import { Button, buttonVariants } from '../ui/button'

export default function RequestDialog() {
  const [state, setState] = useState<'info' | 'docs'>('info')
  const [data, setData] = useState<TAppointmentData | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAppointmentData>({
    resolver: zodResolver(appointmentSchema)
  })

  const onSubmit = async (inputs: TAppointmentData) => {
    setData(inputs)
    setState('docs')
  }



  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(buttonVariants(), 'w-full')}
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>ফর্ম পূরণ করুন</AlertDialogHeader>

        {state === 'info' && (

        )}

        {state === 'docs' && (
          <UploadDocuments
            submitApplication={submitApplication}
            setState={setState}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
