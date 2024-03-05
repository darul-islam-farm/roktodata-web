'use client'

import requests from '@/services/network/http'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'
import ProfileCard from '@/components/dashboard/ProfileCard'
import Container from '@/components/shared/Container'

export default function Profile() {
  const { data: session } = useSession()
  const { data, isLoading } = useAsync(
    `/api/user/get-own-info?id=${session?.user.id}`,
    requests.get
  )

  return data ? (
    <ProfileCard data={data.user} isLoading={isLoading} onProfile />
  ) : (
    <Container size='sm' className='grid gap-8'>
      <div className='rounded w-full h-20 bg-extralight animate-pulse' />
      <div className='rounded w-full h-20 bg-extralight animate-pulse' />
      <div className='rounded w-full h-20 bg-extralight animate-pulse' />
      <div className='rounded w-full h-20 bg-extralight animate-pulse' />
      <div className='rounded w-full h-20 bg-extralight animate-pulse' />
    </Container>
  )
}
