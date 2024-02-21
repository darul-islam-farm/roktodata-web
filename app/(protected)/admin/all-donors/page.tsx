import { getDonorData } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function AllDonors() {
  const data = await getDonorData('ACCEPTED')
  console.log('data', data.data[1].donorProfile.appointments)
  return (
    <div>
      <UserTable data={data.data} userType='DONOR' title='সকল ডোনার' />
    </div>
  )
}
