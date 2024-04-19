import { getDonations } from '@/actions/others'

import DonationCards from '@/components/dashboard/DonationCards'

export default async function Donations() {
  const { data, error } = await getDonations('DONOR')
  return error ? (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>ইরর হয়েছে, আবার চেষ্টা করুন।</h1>
    </div>
  ) : data.length ? (
    <div>
      <h1 className='text-dark'>রক্তদান</h1>
      <p className='text-litetext font-light'>আমার রক্তদানের ইতিহাস</p>
      <DonationCards donations={data} />
    </div>
  ) : (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>আপনি এখনও কোনো রক্তদান করেননি।</h1>
    </div>
  )
}
