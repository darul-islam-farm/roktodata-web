import { getAppointmentsForDonor } from '@/actions/user'
import { auth } from '@/configs/auth'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForDonor() {
  const session = await auth()
  const { data } = await getAppointmentsForDonor(session?.user.id as string)
  return <AppointmentsTable data={data} />
}
