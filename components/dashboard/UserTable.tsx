'use client'

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

type TPros = {
  data: any
  type: string
}

export default function UserTable({ data, type }: TPros) {
  return (
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
        {data?.map((item: any, idx: number) => (
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
                    name: 'accept',
                    action: () => alert(`accept => ${item.id}`)
                  },
                  {
                    name: 'reject',
                    action: () => alert(`reject => ${item.id}`)
                  }
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>{/* Add Pagination here */}</TableFooter>
    </Table>
  )
}
