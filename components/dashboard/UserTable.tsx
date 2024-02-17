'use client'

import { deleteUser } from '@/actions/admin'
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

export default function UserTable({ title, data, userType }: TProps) {
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
                  actions={[
                    {
                      name: `delete ${
                        userType === 'DONOR' ? 'donor' : 'receiver'
                      }`,
                      action: () =>
                        confirmAlertAsync({
                          title: `${
                            userType === 'DONOR' ? 'ডোনারকে' : 'রক্তগ্রহীতাকে'
                          } ডিলিট করতে চান?`,
                          body: 'ডিলিট করা হলে সকল তথ্য মুছে যাবে।',
                          precom: () =>
                            deleteUser(
                              item.id,
                              userType === 'DONOR' ? 'DONOR' : 'RECEIVER'
                            )
                        })
                    }
                  ]}
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
