import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function AuthBtn() {
  const { data } = useSession()
  const { push } = useRouter()

  return data ? (
    <Button
      shadow
      onClick={() => push(`/dashboard/${data.user.role.toLowerCase()}`)}
      variant='primarysubtle'
      className='mt-8'
    >
      প্রোফাইল <ArrowRight className='h-5' />
    </Button>
  ) : (
    <div className='mt-10 grid gap-y-4'>
      <Button
        size='lg'
        className='shadow-md'
        onClick={() => push('/auth/login')}
      >
        লগইন করুন
      </Button>
      <Button
        size='lg'
        className='shadow-md'
        onClick={() => push('/auth/register?type=donor')}
        variant='secondarysubtle'
      >
        রক্তদাতা রেজিস্ট্রেশন করুন
      </Button>
    </div>
  )
}
