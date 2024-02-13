import { getDonorData } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function DonorRequests() {
  const data = await getDonorData('PENDING')

  return (
    <div>
      <UserTable
        data={data.data}
        actionType='requests'
        title='সকল ডোনার রিকুয়েস্ট'
      />
    </div>
  )
}
