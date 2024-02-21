import { getAppointments } from '@/actions/others'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForAdmin() {
  const { data } = await getAppointments()
  return (
    <div>
      <AppointmentsTable
        title='পেন্ডিং আবেদন'
        isAdmin
        data={data.filter((item: TAppointment) => item.status === 'PENDING')}
      />
      <AppointmentsTable
        title='ভেরিফাইড আবেদন'
        isAdmin
        data={data.filter((item: TAppointment) => item.status === 'VERIFIED')}
      />
      <AppointmentsTable
        title='গৃহীত আবেদন'
        isAdmin
        data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
      />
      <AppointmentsTable
        title='কমপ্লিটেড আবেদন'
        isAdmin
        data={data.filter((item: TAppointment) => item.status === 'COMPLETED')}
      />
      <AppointmentsTable
        title='অস্বীকৃত আবেদন'
        isAdmin
        data={data.filter((item: TAppointment) => item.status === 'CANCELED')}
      />
    </div>
  )
}
