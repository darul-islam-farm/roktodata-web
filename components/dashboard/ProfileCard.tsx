import { auth } from '@/configs/auth'
import { api } from '@/configs/site'
import { Facebook, Twitter, Youtube } from 'lucide-react'

export default async function ProfileCard() {
  const session = await auth()
  const response = await fetch(
    `${api}/api/user/get-own-info?id=${session?.user.id}`,
    {
      next: { tags: ['owninfo'] }
    }
  )
  const data = await response.json()
  return (
    <div>
      <h1 className='text-dark'>প্রোফাইল তথ্য</h1>
      <p className='text-litetext font-light text-sm'>
        একাউন্টের বেসিক তথ্যগুলো এখানে দেখানো হয়েছে, বিস্তারিত দেখতে ও এডিট করতে
        এডিট বাটনে ক্লিক করুন।
      </p>
      <hr className='my-4' />
      <div className='flex flex-col gap-3'>
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-dark'>পূর্ণ নাম: </p>
            <p className='font-light text-litetext'>{data?.user?.name}</p>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-dark'>Mobile:</p>
            <p className='font-light text-litetext'>+8801 53714 XXXX</p>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-dark'>Email:</p>
            <p className='font-light text-litetext'>dummy {/* dummy */}</p>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-dark'>Location:</p>
            <p className='font-light text-litetext'>Bangladesh</p>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-dark'>Social Links:</p>
            <div className='flex items-center gap-3'>
              <Facebook className='size-6 rounded-full bg-secondary text-light p-1' />
              <Twitter className='size-6 rounded-full bg-secondary text-light p-1' />
              <Youtube className='size-6 rounded-full bg-secondary text-light p-1' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
