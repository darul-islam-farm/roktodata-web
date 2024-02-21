import { getAppointmentForUser } from '@/actions/others'
import { auth } from '@/configs/auth'

import DetailsApplication from '@/components/dashboard/DetailsApplication'

export default async function ReceiverApplications() {
  const session = await auth()
  const { data, error } = await getAppointmentForUser(
    session?.user.id as string
  )
  return data ? (
    <DetailsApplication data={data} access='USER' />
  ) : error ? (
    <h1 className='text-center mt-4 text-red-500'>
      ইরর হয়েছে, আবার চেষ্টা করুন।
    </h1>
  ) : (
    <h1 className='text-center mt-4 text-red-500'>আপনার কোনো আবেদন নেই।</h1>
  )
}
