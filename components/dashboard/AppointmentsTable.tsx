'use client'

import Link from 'next/link'
import { deleteAppointment } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import dayjs from 'dayjs'
import { Eye, Trash2Icon } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

type TProps = {
  data: any
  title: string
  isAdmin?: boolean
  type?: 'declined' | 'normal'
}

export default function AppointmentsTable({
  data,
  title,
  isAdmin,
  type = 'normal'
}: TProps) {
  return (
    <div>
      <h1 className='text-center my-8 text-secondary'>{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>Donor</TableHead>
            <TableHead className='min-w-40'>Receiver</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        {!data?.length && (
          <TableCaption>
            <h1 className='text-primary text-xl h-40 flex items-center justify-center'>
              কোনো ডাটা পাওয়া যায়নি।
            </h1>
          </TableCaption>
        )}
        <TableBody>
          {data.map(
            (
              { id, donor, receiver, scheduledAt }: TAppointment,
              idx: number
            ) => (
              <TableRow key={idx}>
                <TableCell className='min-w-40'>{donor.user.name}</TableCell>
                <TableCell className='min-w-40'>{receiver.user.name}</TableCell>
                <TableCell>
                  {dayjs(scheduledAt).format('D MMM, YY  ~  h : mm A')}
                </TableCell>
                <TableCell className='flex items-center gap-8'>
                  <Link
                    className='font-medium text-emerald-500 hover:text-secondary flex items-center gap-1'
                    href={
                      isAdmin
                        ? `/dashboard/admin/appointments/details?id=${id}&type=${type}`
                        : `/dashboard/donor/appointments/details?id=${id}`
                    }
                  >
                    <Eye className='size-7' />
                  </Link>
                  {isAdmin && (
                    <Trash2Icon
                      onClick={() =>
                        confirmAlertAsync({
                          body: 'আবেদনটি ডেটাবেজ থেকে মুছে ফেলা হবে?',
                          precom: () => deleteAppointment(id),
                          successText: 'আবেদনটি মুছে ফেলা হয়েছে।'
                        })
                      }
                      className='size-6 text-red-500 cursor-pointer hover:text-secondary'
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}
