'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteForum } from '@/actions/forum'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import { Eye, PenBox, Trash2 } from 'lucide-react'

import ForumEdit from './ForumEdit'

export default function ForumActions({ forum }: { forum: TForum }) {
  const [open, setOpen] = useState(false)
  const removeForum = async () => {
    await confirmAlertAsync({
      title: 'পোস্টটি ডিলিট করবেন?',
      precom: () => deleteForum(forum.id),
      successText: 'পোস্টটি ডিলিট করা হয়েছে।'
    })
  }
  return (
    <div>
      <ForumEdit
        body={forum.body}
        id={forum.id}
        open={open}
        setOpen={setOpen}
      />
      <div className='flex items-center gap-2'>
        <Link className='text-secondary' href={`/forum?id=${forum.id}`}>
          <Eye />
        </Link>
        <PenBox
          onClick={() => setOpen(true)}
          className='h-5 cursor-pointer text-success'
        />
        <Trash2
          onClick={removeForum}
          className='h-5 cursor-pointer text-danger'
        />
      </div>
    </div>
  )
}
