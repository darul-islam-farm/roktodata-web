import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function TypeDialog({
  open,
  setOpen
}: {
  open: boolean
  setOpen: Function
}) {
  const { push } = useRouter()
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className='relative'>
          <AlertDialogTitle>লগইন টাইপ</AlertDialogTitle>
          <div className='absolute -top-4 right-0 cursor-pointer'>
            <X onClick={() => setOpen(false)} />
          </div>
          <AlertDialogDescription>
            আপনি কোন ইউজার হিসেবে লগইন করতে চান?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='gap-2'>
          <Button
            onClick={() => push('/auth/register?type=donor')}
            className='bg-secondary'
          >
            আমি রক্তদাতা
          </Button>
          <Button onClick={() => push('/auth/register?type=receiver')}>
            আমার রক্ত লাগবে
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
