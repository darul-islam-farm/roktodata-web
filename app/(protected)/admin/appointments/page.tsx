import { getAppointments } from '@/actions/others'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForAdmin() {
  const { data } = await getAppointments()
  return (
    <div>
      <AppointmentsTable
        title='আনভেরিফাইড আবেদন'
        isAdmin
        type='UNVERIFIED'
        data={data.filter((item: TAppointment) => item.status === 'UNVERIFIED')}
      />
      <AppointmentsTable
        title='পেন্ডিং আবেদন'
        isAdmin
        type='PENDING'
        data={data.filter((item: TAppointment) => item.status === 'PENDING')}
      />
      <AppointmentsTable
        title='গৃহীত আবেদন'
        isAdmin
        type='ACCEPTED'
        data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
      />
      <AppointmentsTable
        title='অস্বীকৃত আবেদন'
        isAdmin
        type='CANCELED'
        data={data.filter((item: TAppointment) => item.status === 'CANCELED')}
      />
    </div>
  )
}
