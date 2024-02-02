import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function AuthBtn({ setOpen }: { setOpen: Function }) {
  const session = useSession()
  const { push } = useRouter()

  return session.data ? (
    <Button
      onClick={() => push('/dashboard/donor')}
      variant='primarysubtle'
      className='mt-8'
    >
      {/* 
        TODO: define role specific dashboard route to push function
        */}
      প্রোফাইল <ArrowRight className='h-5' />
    </Button>
  ) : (
    <div className='mt-10 grid gap-y-4'>
      <Button onClick={() => push('/auth/login')}>লগইন করুন</Button>
      <Button onClick={() => setOpen(true)} variant='secondarysubtle'>
        রেজিস্ট্রেশন করুন
      </Button>
    </div>
  )
}
