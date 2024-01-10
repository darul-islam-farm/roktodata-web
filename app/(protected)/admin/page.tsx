import { getDonor } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function AdminDashboard() {
  const data = await getDonor('DONOR')

  return (
    <div>
      <UserTable data={data} type='donor' />
    </div>
  )
}
