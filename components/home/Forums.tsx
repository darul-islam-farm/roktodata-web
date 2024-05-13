import Image from 'next/image'
import Link from 'next/link'
import { getForums } from '@/actions/forum'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'

export default async function Forums() {
  const { data } = await getForums()
  console.log('forums', data)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8'>
      {data.map((forum: TForum, idx: number) => (
        <div className='col-auto group rounded-lg' key={idx}>
          <Image
            src={
              forum.image
                ? `https://utfs.io/f/${forum.image}`
                : '/images/donations/donate1.jpg'
            }
            alt='donations'
            width={300}
            height={250}
            className='w-full rounded-t-lg'
          />
          <div className='mt-4 px-2 pb-4 group-hover:shadow-xl duration-300 rounded-b-lg'>
            <p className='uppercase font-medium text-xs flex gap-2 items-center'>
              <span>{dayjs(forum.createdAt).format('D MMM, YY @ h:mm a')}</span>
              <span className='h-1 w-1 rounded-full bg-litetext' />
              <span>{forum.author?.name ?? 'Unnamed user'}</span>
            </p>
            <h2 className='text-dark'>{forum.title}</h2>
            <p className='font-light text-sm mt-2'>
              {forum.body.slice(0, 100)}...
            </p>
            <div className='mt-4'>
              <Link
                href='/'
                className='flex items-center gap-1 font-medium text-xs'
              >
                বিস্তারিত পড়ুন <ArrowRight className='size-4' />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
