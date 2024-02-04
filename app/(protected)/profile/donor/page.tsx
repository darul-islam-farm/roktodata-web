'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/configs/site'
import requests from '@/services/network/http'

import useAsync from '@/lib/useAsync'

export default function DonorProfile() {
  const searchparams = useSearchParams()

  const { data, isLoading, error } = useAsync(
    `${api}/api/donor/get-donor-profile?id=${searchparams.get('id')}`,
    requests.get
  )
  console.log('data', data)
  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>error ocurred</div>
  ) : (
    <div>Donor Profile</div>
  )
}
