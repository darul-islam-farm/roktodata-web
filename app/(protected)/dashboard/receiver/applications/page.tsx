import { getAppointmentById } from '@/actions/others'
import { auth } from '@/configs/auth'

export default async function ReceiverApplications() {
  const session = await auth()
  const { data } = await getAppointmentById(session?.user.id as string)
  console.log('data', data)
  return (
    <div>
      <h1 className='text-center my-8 text-secondary'>আপনার আবেদন</h1>
    </div>
  )
}
