import { getAppointmentById } from '@/actions/others'
import { auth } from '@/configs/auth'

import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default async function ReceiverApplications() {
  const session = await auth()
  const { data } = await getAppointmentById(session?.user.id as string)
  return (
    <div>
      <DetailsApplication data={data} access='USER' />
    </div>
  )
}
