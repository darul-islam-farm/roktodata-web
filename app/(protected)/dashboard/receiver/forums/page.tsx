import { getOwnForums } from '@/actions/forum'
import dayjs from 'dayjs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ForumActions from '@/components/forums/ForumActions'

export default async function MyForums() {
  const { data } = await getOwnForums()

  return (
    <div>
      <h1 className='text-center my-8 text-secondary'>আমার পোস্টসমূহ</h1>
      {!data.length && (
        <h1 className='text-danger text-center'>
          আপনি এখনো কোনো পোস্ট করেননি।
        </h1>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((forum: TForum, idx: number) => (
            <TableRow key={idx}>
              <TableCell className='max-w-40'>
                {forum.title.slice(0, 30)}...
              </TableCell>
              <TableCell className='text-litetext text-xs font-medium'>
                {dayjs(forum.createdAt).format('D MMM, YY @ h:mm a')}
              </TableCell>
              <TableCell className='text-litetext text-xs font-medium'>
                {dayjs(forum.updatedAt).format('D MMM, YY @ h:mm a')}
              </TableCell>
              <TableCell className='flex gap-2 items-center'>
                <ForumActions forum={forum} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
