'use client'

import { deleteMod, updateModStatus } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import { MoreVertical } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import CMenu from '../customs/CMenu'

type TListType = 'PENDING' | 'ACCEPTED' | 'REJECTED'
type TProps = {
  title: string
  data: TUser[]
  type: TListType
}

export default function ModTable({ title, data, type }: TProps) {
  return (
    <div>
      <h1 className='text-center my-8 text-secondary'>{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>identity</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        {!data.length && (
          <TableCaption>
            <h1 className='text-primary h-40 flex items-center justify-center'>
              কোনো ডাটা পাওয়া যায়নি।
            </h1>
          </TableCaption>
        )}
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className='min-w-40'>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.identity}</TableCell>
              <TableCell className='w-20'>
                <CMenu
                  trigger={<MoreVertical />}
                  actions={getActions(item.id, type)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>{/** @TODO Add Pagination here */}</TableFooter>
      </Table>
    </div>
  )
}

const getActions = (id: string, type: TListType) => {
  return type === 'PENDING'
    ? [
        {
          name: 'accept',
          action: () =>
            confirmAlertAsync({
              title: 'রিকুয়েস্টটি কনফার্ম করতে চান?',
              precom: () => updateModStatus(id, 'ACCEPTED'),
              successText: 'রিকুয়েস্টটি কনফার্ম করা হয়েছে।'
            })
        },
        {
          name: 'reject',
          action: () =>
            confirmAlertAsync({
              title: 'রিকুয়েস্টটি বাতিল করতে চান?',
              precom: () => updateModStatus(id, 'REJECTED'),
              successText:
                'রিকুয়েস্টটি বাতিল করা হয়েছে এবং বাতিল তালিকায় সংরক্ষণ করা হয়েছে।'
            })
        }
      ]
    : [
        {
          name: 'delete moderator',
          action: () =>
            confirmAlertAsync({
              title: 'ডিলিট করতে চান?',
              precom: () => deleteMod(id),
              successText: 'ডিলিট করা হয়েছে।'
            })
        }
      ]
}
