import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getSingleForum } from '@/actions/forum'
import dayjs from 'dayjs'

import Container from '@/components/shared/Container'

export default async function ForumDetails({
  searchParams: { id }
}: {
  searchParams: { [key: string]: string }
}) {
  const { data: post, error } = await getSingleForum(id)
  if (error || !post) return notFound()

  return (
    <Container size='sm' className='my-10'>
      <div className='mb-2'>
        <Image
          width={500}
          height={400}
          className='size-full rounded-lg shadow-md'
          src={
            post.image
              ? `https://utfs.io/f/${post.image}`
              : '/images/donations/donate1.jpg'
          }
          alt='post thumbnail'
        />
      </div>
      <h2>{post.title}</h2>
      <p className='uppercase font-medium text-xs flex gap-2 items-center'>
        <span>{dayjs(post.createdAt).format('D MMM, YY @ h:mm a')}</span>
        <span className='h-1 w-1 rounded-full bg-litetext' />
        <span>{post.author?.name ?? 'Unnamed user'}</span>
      </p>
      <p className='mt-4 whitespace-pre-line'>{post.body}</p>
    </Container>
  )
}
