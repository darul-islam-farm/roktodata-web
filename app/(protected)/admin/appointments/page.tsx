import { getAppointments } from '@/actions/others'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForAdmin() {
  const { data } = await getAppointments()
  return <AppointmentsTable isAdmin data={data} />
}
