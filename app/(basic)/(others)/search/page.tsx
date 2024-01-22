import { redirect } from 'next/navigation'
import { getSearchedDonor } from '@/actions/others'

import { cn } from '@/lib/utils'
import Container from '@/components/shared/Container'
import SearchModal from '@/components/shared/SearchModal'
import DonorCard from '@/components/shared/ui/DonorCard'

export default async function Search({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { bloodType, jilla } = searchParams
  if (!bloodType || !jilla) redirect('/')

  const convertedBloodType = () => {
    if (bloodType.includes('-')) return bloodType
    return `${bloodType.trim()}+`
  }

  const data = await getSearchedDonor({
    bloodType: convertedBloodType(),
    jilla
  })

  return !data.length ? (
    <div className='px-4 h-[60vh] flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-primary text-2xl md:text-3xl'>
          {jilla} জেলায় কোনো {convertedBloodType()} রক্তের ডোনার খুঁজে পাওয়া
          যায়নি।
        </h1>
        <div className='mt-4'>
          <SearchModal trigger='ভিন্ন জেলায় সার্চ করুন' />
        </div>
      </div>
    </div>
  ) : (
    <Container className='mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3'>
        {data.map((donor: TUser, idx: number) => (
          <div className='col-auto' key={idx}>
            <DonorCard donor={donor} />
          </div>
        ))}
      </div>
    </Container>
  )
}
