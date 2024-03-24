import Image from 'next/image'
import dayjs from 'dayjs'

export default async function DonationDetails() {
  return (
    <div>Donations</div>
    // <div>
    //   <h1 className='my-8 text-secondary'>ডোনেশন বিস্তারিত বিস্তারিত</h1>
    //   <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
    //     <div className='col-auto'>
    //       <h2>ডোনারের তথ্য</h2>
    //       <hr className='mb-2' />
    //       <div className='grid gap-2'>
    //         <p>
    //           নাম :
    //           <span className='text-dark pl-2'>{data.donor.user.name}</span>
    //         </p>
    //         <p>
    //           জেলা :
    //           <span className='text-dark pl-2'>{data.donor.user.jilla}</span>
    //         </p>
    //         <p>
    //           উপজেলা :
    //           <span className='text-dark pl-2'>{data.donor.user.subJilla}</span>
    //         </p>
    //         <p>
    //           থানা :
    //           <span className='text-dark pl-2'>{data.donor.user.thana}</span>
    //         </p>
    //       </div>
    //     </div>
    //     <div className='col-auto'>
    //       <h2>রিসিভারের তথ্য</h2>
    //       <hr className='mb-2' />
    //       <div className='grid gap-2'>
    //         <p>
    //           নাম :<span className='text-dark pl-2'>{data.receiver.name}</span>
    //         </p>
    //         <p>
    //           জেলা :
    //           <span className='text-dark pl-2'>{data.receiver.jilla}</span>
    //         </p>
    //         <p>
    //           উপজেলা :
    //           <span className='text-dark pl-2'>{data.receiver.subJilla}</span>
    //         </p>
    //         <p>
    //           থানা :
    //           <span className='text-dark pl-2'>{data.receiver.thana}</span>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='mt-6'>
    //     <h2>আবেদনের তথ্য</h2>
    //   </div>
    //   <hr />
    //   <div className='mt-6'>
    //     <h3 className='font-medium'>
    //       আবেদনের সময় :
    //       <span className='text-secondary pl-4'>
    //         {dayjs(data.scheduledAt).format('D MMM, YY  ~  h : mm A')}
    //       </span>
    //     </h3>
    //     <h3 className='font-medium mt-2'>হাসপাতালের ঠিকানা</h3>
    //     <p>{data.address}</p>
    //   </div>
    //   <div className='mt-6'>
    //     <h2>সংশ্লিষ্ট ফাইল</h2>
    //     <hr />
    //     <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
    //       <div className='col-auto'>
    //         <Image
    //           width={400}
    //           height={300}
    //           src={`https://utfs.io/f/${data.image}`}
    //           alt='file image'
    //           className='w-full'
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
