import Image from 'next/image'

import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'

export default function DonationCards({
  donations,
  forDonor
}: {
  donations: TDonation[]
  forDonor?: boolean
}) {
  const getAppropriateData = (donation: TDonation) =>
    forDonor ? donation.receiver : donation.donor.user

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-8'>
        {donations.map((donation, idx) => (
          <div
            key={idx}
            className='col-auto card-shadow bg-white flex justify-center py-8'
          >
            <div>
              <div className='overflow-hidden'>
                <div className='relative w-32 h-32'>
                  <Image
                    src={`https://utfs.io/f/${donation.image}`}
                    alt='donations'
                    width={150}
                    height={100}
                    className='object-center bg-cover'
                  />
                </div>
              </div>
              <div className='mt-4 px-2'>
                <p className='uppercase font-medium text-xs'>Donation #1</p>
                <p className='font-light mt-2'>{donation.address}</p>
                <div className='mt-4'>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'text-primary'
                      )}
                    >
                      View Details
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        {forDonor ? 'রক্তগ্রহীতার তথ্য' : 'রক্তদাতার তথ্য'}
                      </AlertDialogHeader>
                      <div className='mb-2 mx-auto'>
                        <div className='flex-center'>
                          <div className='bg-primary shadow-lg shadow-black/50 size-32 md:size-40 rounded-full flex-center text-white font-bold text-5xl'>
                            {getAppropriateData(donation).bloodType}
                          </div>
                        </div>
                        <div className='mt-4 grid gap-y-2 min-w-[300px]'>
                          <div className='grid grid-cols-2'>
                            <div className='col-auto'>
                              <p className='font-medium text-dark'>জেলা</p>
                              <p>{getAppropriateData(donation).jilla}</p>
                            </div>
                            <div className='col-auto'>
                              <p className='font-medium text-dark'>উপজেলা</p>
                              <p>{getAppropriateData(donation).subJilla}</p>
                            </div>
                          </div>
                          <div className='grid grid-cols-2'>
                            <div className='col-auto'>
                              <p className='font-medium text-dark'>থানা</p>
                              <p>{getAppropriateData(donation).thana}</p>
                            </div>
                            <div className='col-auto'>
                              <p className='font-medium text-dark'>ধর্ম</p>
                              <p>{getAppropriateData(donation).religion}</p>
                            </div>
                          </div>
                          <div>
                            <p className='font-medium text-dark'>ঠিকানা</p>
                            <p>{getAppropriateData(donation).address}</p>
                          </div>

                          <div>
                            <p className='font-medium text-dark'>ফোন নম্বর</p>
                            <p>
                              {getAppropriateData(donation).phone},{' '}
                              {getAppropriateData(donation).phone2}
                            </p>
                          </div>
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          className={buttonVariants({
                            variant: 'primarysubtle'
                          })}
                        >
                          Close
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
