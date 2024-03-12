'use client'

import requests from '@/services/network/http'
import { useSession } from 'next-auth/react'

import useAsync from '@/lib/useAsync'
import DonationCards from '@/components/dashboard/DonationCards'
import CardSkeleton from '@/components/shared/skeleton/Card.S'

export default function Donations() {
  const { data: session } = useSession()
  const { data, isLoading } = useAsync(
    `/api/user/get-own-info?id=${session?.user.id}`,
    requests.get
  )
  return (
    <div>
      <h1 className='text-dark'>Donations</h1>
      <p className='text-litetext font-light'>My donations history</p>
      {isLoading && !data ? (
        <CardSkeleton />
      ) : (
        <DonationCards donations={data.user.donorProfile.donationHistory} />
      )}
    </div>
  )
}
