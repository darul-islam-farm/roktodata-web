import Image from 'next/image'
import { getSingleDonation } from '@/actions/others'
import dayjs from 'dayjs'

import Container from '@/components/shared/Container'

export default async function DonationDetails({
  searchParams
}: {
  searchParams: { [key: string]: string }
}) {
  const { data } = await getSingleDonation(searchParams.id)

  return (
    <div className='my-10'>
      <h1 className='mb-12 text-secondary text-center'>ডোনেশন বিস্তারিত</h1>
      <Container size='sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
          <div className='col-auto'>
            <h2>ডোনারের তথ্য</h2>
            <hr className='mb-2' />
            <div className='grid gap-2'>
              <p>
                জেলা :
                <span className='text-dark pl-2'>{data.donor.user.jilla}</span>
              </p>
              <p>
                উপজেলা :
                <span className='text-dark pl-2'>
                  {data.donor.user.subJilla}
                </span>
              </p>
              <p>
                থানা :
                <span className='text-dark pl-2'>{data.donor.user.thana}</span>
              </p>
            </div>
          </div>
          <div className='col-auto'>
            <h2>রিসিভারের তথ্য</h2>
            <hr className='mb-2' />
            <div className='grid gap-2'>
              <p>
                জেলা :
                <span className='text-dark pl-2'>{data.receiver.jilla}</span>
              </p>
              <p>
                উপজেলা :
                <span className='text-dark pl-2'>{data.receiver.subJilla}</span>
              </p>
              <p>
                থানা :
                <span className='text-dark pl-2'>{data.receiver.thana}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <h2>আবেদনের তথ্য</h2>
        </div>
        <hr />
        <div className='mt-6'>
          <h3 className='font-medium'>
            আবেদনের সময় :
            <span className='text-secondary pl-4'>
              {dayjs(data.scheduledAt).format('D MMM, YY  ~@~  h : mm A')}
            </span>
          </h3>
        </div>
        <div className='mt-6'>
          <h3 className='font-medium'>সংশ্লিষ্ট ফাইল</h3>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div className='col-auto'>
              <Image
                width={400}
                height={300}
                src={`https://utfs.io/f/${data.image}`}
                alt='file image'
                className='w-full'
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
