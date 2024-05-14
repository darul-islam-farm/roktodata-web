'use client'

import { editForum } from '@/actions/forum'
import { errorAlert } from '@/services/alerts/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { GTextarea } from '../customs/GInput'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

type TProps = {
  open: boolean
  setOpen: Function
  body: string
  id: string
}
const forumBodySchema = z.object({
  body: z.string().min(5, 'আপনার কিছু অভিব্যক্তি প্রকাশ করুন')
})
type TForumbodydata = z.infer<typeof forumBodySchema>

export default function ForumEdit({ open, setOpen, body, id }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TForumbodydata>({
    resolver: zodResolver(forumBodySchema),
    defaultValues: {
      body
    }
  })

  const onSubmit = async ({ body }: TForumbodydata) => {
    const res = await editForum(id, { body })
    res.ok
      ? toast.success('সফলভাবে এডিট করা হয়েছে।')
      : errorAlert({ body: 'একটি ইরর হয়েছে, আবার চেষ্টা করুন।' })

    setOpen(false)
  }

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader builtin>পোস্ট এডিট করুন</AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <GTextarea
              name='body'
              message={errors.body?.message}
              register={register}
              label='মন্তব্য লিখুন'
            />
            <div className='flex mt-4 justify-end gap-2'>
              <Button
                variant='primarysubtle'
                onClick={() => setOpen(false)}
                type='button'
              >
                Cancel
              </Button>
              <Button variant='secondarysubtle' type='submit'>
                Update
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
