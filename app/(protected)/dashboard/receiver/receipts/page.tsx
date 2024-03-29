import { getDonations } from '@/actions/others'

import DonationCards from '@/components/dashboard/DonationCards'

export default async function DonationsForReceiver() {
  const { data, error } = await getDonations('RECEIVER')

  return error ? (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>ইরর হয়েছে, আবার চেষ্টা করুন।</h1>
    </div>
  ) : data.length ? (
    <div>
      <h1 className='text-dark'>রক্তগ্রহণ</h1>
      <p className='text-litetext font-light'>আমার রক্তগ্রহণের ইতিহাস</p>
      <DonationCards donations={data} />
    </div>
  ) : (
    <div className='my-10 text-center'>
      <h1 className='text-red-500'>আপনি এখনও কোনো রক্তগ্রহণ করেননি।</h1>
    </div>
  )
}
