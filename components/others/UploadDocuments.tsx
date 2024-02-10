'use client'

import { useState } from 'react'
import { errorAlert } from '@/services/alerts/alerts'
import requests from '@/services/network/http'
import { ArrowLeft, PlusCircle, SendHorizonal, X } from 'lucide-react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

type TProps = {
  setState: Function
  submitApplication: Function
}

export default function UploadDocuments({
  setState,
  submitApplication
}: TProps) {
  return (
    <div>
      <Button
        onClick={() => setState('info')}
        variant='secondarysubtle'
        size='sm'
      >
        <ArrowLeft className='size-4' />
        ফিরে যান
      </Button>
      <form action={(data) => onSubmit(data)} className='mt-6'></form>
    </div>
  )
}
