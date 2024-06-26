import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSearchedDonor } from '@/actions/others'
import convertBloodType from '@/helper/convertBloodType'

import Container from '@/components/shared/Container'
import DonorCard from '@/components/shared/ui/DonorCard'
import Filterbar from '@/components/shared/ui/Filterbar'

export const metadata: Metadata = {
  title: 'সার্চ ফলাফল'
}

export default async function Search({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { bloodType, jilla, ageFrom, ageTo, religion } = searchParams
  if (!bloodType || !jilla) redirect('/')

  const data = await getSearchedDonor({
    bloodType: convertBloodType(bloodType),
    jilla,
    ageFrom,
    ageTo,
    religion
  })

  return (
    <Container className='mt-10'>
      <div className='mb-8'>
        <Filterbar
          data={{
            bloodType: convertBloodType(bloodType),
            jilla,
            ageFrom,
            ageTo,
            religion
          }}
        />
      </div>
      {data.length ? (
        <div>
          <h1 className='text-primary text-center'>সার্চ ফলাফল</h1>
          <hr className='mb-8' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3'>
            {data.map((donor: TDonor, idx: number) => (
              <div className='col-auto' key={idx}>
                <DonorCard donor={donor} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className='text-primary text-2xl md:text-3xl mt-4 text-center'>
            {jilla} জেলায় কোনো {convertBloodType(bloodType)} রক্তের ডোনার খুঁজে
            পাওয়া যায়নি।
          </h1>
          <div className='text-center'>
            ধর্ম, বয়স ইত্যাদি ফিল্টারগুলো পরিবর্তন করে আবার চেষ্টা করুন।
          </div>
        </div>
      )}
    </Container>
  )
}
