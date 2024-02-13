import { getDonorData } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function AllReceivers() {
  const data = await getDonorData('RECEIVER', 'ACCEPTED')

  return (
    <div>
      <UserTable
        data={data.data}
        actionType='granted'
        userType='RECEIVER'
        title='সকল রক্তগ্রহীতা'
      />
    </div>
  )
}
