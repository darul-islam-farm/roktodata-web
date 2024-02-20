import Image from 'next/image'
import dayjs from 'dayjs'

type TProps = {
  data: any
  access: 'ADMIN' | 'USER'
}

export default function DetailsApplication({ data, access }: TProps) {
  return (
    <div>
      <h1 className='my-8 text-secondary'>আবেদনের বিস্তারিত</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        <div className='col-auto'>
          <h2>ডোনারের তথ্য</h2>
          <hr className='mb-2' />
          <div className='grid gap-2'>
            <p>
              নাম :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.name}
              </span>
            </p>
            <p>
              জেলা :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.jilla}
              </span>
            </p>
            <p>
              উপজেলা :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.subJilla}
              </span>
            </p>
            <p>
              থানা :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.thana}
              </span>
            </p>
            {access === 'ADMIN' && (
              <p>
                আইডেন্টিটি :
                <span className='text-secondary pl-2 text-xl font-medium'>
                  {data.appointment.donor.user.identity}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className='col-auto'>
          <h2>রিসিভারের তথ্য</h2>
          <hr className='mb-2' />
          <div className='grid gap-2'>
            <p>
              নাম :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.name}
              </span>
            </p>
            <p>
              জেলা :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.jilla}
              </span>
            </p>
            <p>
              উপজেলা :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.subJilla}
              </span>
            </p>
            <p>
              থানা :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.thana}
              </span>
            </p>
            {access === 'ADMIN' && (
              <p>
                আইডেন্টিটি :
                <span className='text-secondary pl-2 text-xl font-medium'>
                  {data.appointment.receiver.identity}
                </span>
              </p>
            )}
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
            {dayjs(data.appointment.scheduledAt).format(
              'D MMM, YY  ~  h : mm A'
            )}
          </span>
        </h3>
        <h3 className='font-medium mt-2'>হাসপাতালের ঠিকানা</h3>
        <p>{data.appointment.address}</p>
        <h3 className='font-medium mt-2'>হাসপাতালের বিষয়ে অন্যান্য তথ্য</h3>
        <p>{data.appointment.hospitalInfo}</p>
        <h3 className='font-medium mt-2'>অন্যান্য তথ্য</h3>
        <p>{data.appointment.additionalInfo}</p>
      </div>
      <div className='mt-6'>
        <h2>সংশ্লিষ্ট ফাইল</h2>
        <hr />
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
          {data.appointment.images.map((item: string, idx: number) => (
            <div className='col-auto'>
              <Image
                width={400}
                height={300}
                src={`https://utfs.io/f/${item}`}
                alt='file image'
                className='w-full'
                key={idx}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
