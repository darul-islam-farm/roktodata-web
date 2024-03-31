import { getAppointmentsForDonor } from '@/actions/user'
import { auth } from '@/configs/auth'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

export default async function AppointmentsForDonor() {
  const session = await auth()
  const { data } = await getAppointmentsForDonor(session?.user.id as string)
  const hasPending = data.find(
    (item: TAppointment) => item.status === 'PENDING'
  )
  const hasAccepted = data.find(
    (item: TAppointment) => item.status === 'ACCEPTED'
  )

  return (
    <div>
      {hasPending ? (
        <AppointmentsTable
          title='আগত আবেদন'
          data={data.filter((item: TAppointment) => item.status === 'PENDING')}
        />
      ) : hasAccepted ? (
        <AppointmentsTable
          title='গৃহীত আবেদন'
          data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
        />
      ) : (
        <h2 className='text-red-500 text-3xl text-center my-8'>
          কোনো আবেদন নেই
        </h2>
      )}
    </div>
  )
}
