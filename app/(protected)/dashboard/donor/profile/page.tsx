'use client'

import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'
import ProfileCard from '@/components/dashboard/ProfileCard'
import Container from '@/components/shared/Container'

export default function Profile() {
  const { data, isLoading } = useAsync('/api/user/get-own-info', requests.get)

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
