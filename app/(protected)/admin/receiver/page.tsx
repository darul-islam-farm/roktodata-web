import { getDonor } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function Receiver() {
  const data = await getDonor('RECEIVER')

  return (
    <div>
      <UserTable data={data} type='receiver' />
    </div>
  )
}
