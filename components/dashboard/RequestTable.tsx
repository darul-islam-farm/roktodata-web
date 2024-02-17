'use client'

import { updateDonorProfile, updateReceiverProfile } from '@/actions/admin'
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

type TProps = {
  title: string
  data: TUser[] | undefined
  userType: TUserType
}

export default function RequestTable({ title, data, userType }: TProps) {
  return (
    <>
      <h1 className='text-center my-8 text-secondary'>{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>identity</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        {!data?.length && (
          <TableCaption>
            <h1 className='text-primary h-40 flex items-center justify-center'>
              কোনো ডাটা পাওয়া যায়নি।
            </h1>
          </TableCaption>
        )}
        <TableBody>
          {data?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className='min-w-40'>{item.name}</TableCell>
              <TableCell>{item.bloodType}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.identity}</TableCell>
              <TableCell className='w-20'>
                <CMenu
                  trigger={<MoreVertical />}
                  actions={requestActions(item, userType)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>{/** @TODO Add Pagination here */}</TableFooter>
      </Table>
    </>
  )
}

const requestActions = ({ id, bloodType }: TUser, userType: TUserType) => {
  if (userType === 'DONOR')
    return [
      {
        name: 'accept',
        action: () =>
          confirmAlertAsync({
            title: 'রিকুয়েস্টটি কনফার্ম করতে চান?',
            body: 'রিকুয়েস্টটি কনফার্ম করা হলে উক্ত ডোনারের একটি ভেরিফাইড প্রোফাইল তৈরি হবে।',
            precom: () =>
              updateDonorProfile({
                bloodType,
                id,
                status: 'ACCEPTED'
              }),
            successText: 'সফলভাবে ডোনার ক্রিয়েট হয়েছে।'
          })
      },
      {
        name: 'reject',
        action: () =>
          confirmAlertAsync({
            title: 'রিকুয়েস্টটি বাতিল করতে চান?',
            body: 'রিকুয়েস্টটি বাতিল করা হলে উক্ত ডোনারের কোনো প্রোফাইল তৈরি হবে না।',
            precom: () =>
              updateDonorProfile({
                bloodType,
                id,
                status: 'REJECTED'
              }),
            successText: 'রিকুয়েস্টটি বাতিল করা হয়েছে।'
          })
      }
    ]
  else
    return [
      {
        name: 'accept',
        action: () =>
          confirmAlertAsync({
            title: 'রিকুয়েস্টটি কনফার্ম করতে চান?',
            body: 'রিকুয়েস্টটি কনফার্ম করা হলে উক্ত রক্তগ্রহীতার একটি ভেরিফাইড প্রোফাইল তৈরি হবে।',
            precom: () =>
              updateReceiverProfile({
                id,
                status: 'ACCEPTED'
              }),
            successText: 'সফলভাবে রক্তগ্রহীতা একাউন্ট ক্রিয়েট হয়েছে।'
          })
      },
      {
        name: 'reject',
        action: () =>
          confirmAlertAsync({
            title: 'রিকুয়েস্টটি বাতিল করতে চান?',
            body: 'রিকুয়েস্টটি বাতিল করা হলে উক্ত রক্তগ্রহীতার কোনো প্রোফাইল তৈরি হবে না।',
            precom: () =>
              updateReceiverProfile({
                id,
                status: 'REJECTED'
              }),
            successText: 'রিকুয়েস্টটি বাতিল করা হয়েছে।'
          })
      }
    ]
}
