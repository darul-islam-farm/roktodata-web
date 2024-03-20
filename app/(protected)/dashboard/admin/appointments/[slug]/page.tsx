import { notFound } from 'next/navigation'
import { getAppointments, getDeclinedAppointments } from '@/actions/others'

import AppointmentsTable from '@/components/dashboard/AppointmentsTable'

type TSlug = 'unverified' | 'pending' | 'accepted' | 'canceled' | 'rejected'

const getComponent = (type: TSlug, data: TAppointment[]) => {
  switch (type) {
    case 'accepted':
      return (
        <AppointmentsTable
          title='গৃহীত আবেদন'
          isAdmin
          status='ACCEPTED'
          data={data.filter((item: TAppointment) => item.status === 'ACCEPTED')}
        />
      )

    case 'canceled':
      return (
        <AppointmentsTable
          title='অস্বীকৃত আবেদন'
          isAdmin
          status='CANCELED'
          type='declined'
          data={data.filter((item: TAppointment) => item.status === 'CANCELED')}
        />
      )

    case 'pending':
      return (
        <AppointmentsTable
          title='পেন্ডিং আবেদন'
          isAdmin
          status='PENDING'
          data={data.filter((item: TAppointment) => item.status === 'PENDING')}
        />
      )

    case 'unverified':
      return (
        <AppointmentsTable
          title='আনভেরিফাইড আবেদন'
          isAdmin
          status='UNVERIFIED'
          data={data.filter(
            (item: TAppointment) => item.status === 'UNVERIFIED'
          )}
        />
      )

    case 'rejected':
      return (
        <AppointmentsTable
          title='রিজেক্টেড আবেদন'
          isAdmin
          status='REJECTED'
          type='declined'
          data={data.filter((item: TAppointment) => item.status === 'REJECTED')}
        />
      )

    default:
      return (
        <AppointmentsTable
          title='আনভেরিফাইড আবেদন'
          isAdmin
          status='UNVERIFIED'
          data={data.filter(
            (item: TAppointment) => item.status === 'UNVERIFIED'
          )}
        />
      )
  }
}

export default async function AllAppointments({
  params: { slug }
}: {
  params: { slug: TSlug }
}) {
  const { data, error } =
    slug === 'rejected' || slug === 'canceled'
      ? await getDeclinedAppointments()
      : await getAppointments()
  if (error) return notFound()
  return getComponent(slug, data)
}
