import { getRequester } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function DonorRequests() {
  const data = await getRequester('DONOR', 'PENDING')

  return (
    <div>
      <UserTable
        data={data.data}
        actionType='requests'
        userType='DONOR'
        title='সকল ডোনার রিকুয়েস্ট'
      />
    </div>
  )
}
