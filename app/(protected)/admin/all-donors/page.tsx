import { getRequester } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function AllDonors() {
  const data = await getRequester('DONOR', 'ACCEPTED')

  return (
    <div>
      <UserTable
        data={data.data}
        actionType='granted'
        userType='DONOR'
        title='সকল ডোনার'
      />
    </div>
  )
}
