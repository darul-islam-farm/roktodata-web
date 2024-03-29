import {
  AtSign,
  HeartPulse,
  LucideIcon,
  MapPinned,
  Phone,
  Sun
} from 'lucide-react'

export type TJilla = (typeof jilla)[0]
export type TWhydonate = {
  icon: LucideIcon
  title: string
  description: string
}

export const jilla = [
  'নরসিংদী',
  'গাজীপুর',
  'শরীয়তপুর',
  'নারায়ণগঞ্জ',
  'টাঙ্গাইল',
  'কিশোরগঞ্জ',
  'মানিকগঞ্জ',
  'ঢাকা',
  'মুন্সিগঞ্জ',
  'রাজবাড়ী',
  'মাদারীপুর',
  'গোপালগঞ্জ',
  'ফরিদপুর',
  'সিরাজগঞ্জ',
  'পাবনা',
  'বগুড়া',
  'রাজশাহী',
  'নাটোর',
  'জয়পুরহাট',
  'চাঁপাইনবাবগঞ্জ',
  'নওগাঁ',
  'যশোর',
  'সাতক্ষীরা',
  'মেহেরপুর',
  'নড়াইল',
  'চুয়াডাঙ্গা',
  'কুষ্টিয়া',
  'মাগুরা',
  'খুলনা',
  'বাগেরহাট',
  'ঝিনাইদহ',
  'সিলেট',
  'মৌলভীবাজার',
  'হবিগঞ্জ',
  'সুনামগঞ্জ',
  'ঝালকাঠি',
  'পটুয়াখালী',
  'পিরোজপুর',
  'বরিশাল',
  'ভোলা',
  'বরগুনা',
  'কুমিল্লা',
  'ফেনী',
  'ব্রাহ্মণবাড়িয়া',
  'রাঙ্গামাটি',
  'নোয়াখালী',
  'চাঁদপুর',
  'লক্ষ্মীপুর',
  'চট্টগ্রাম',
  'কক্সবাজার',
  'খাগড়াছড়ি',
  'বান্দরবান',
  'শেরপুর',
  'ময়মনসিংহ',
  'জামালপুর',
  'নেত্রকোণা',
  'পঞ্চগড়',
  'দিনাজপুর',
  'লালমনিরহাট',
  'নীলফামারী',
  'গাইবান্ধা',
  'ঠাকুরগাঁও',
  'রংপুর',
  'কুড়িগ্রাম'
]

export const donationimages: string[] = [
  '/images/donations/donate1.jpg',
  '/images/donations/donate2.jpg',
  '/images/donations/donate3.jpg'
]

export const bloodGroups: string[] = [
  'A+',
  'B+',
  'A-',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-'
]

export const whyDonate: TWhydonate[] = [
  {
    icon: HeartPulse,
    title: 'অন্যের জীবন বাঁচান',
    description:
      'আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে। আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে।'
  },
  {
    icon: HeartPulse,
    title: 'অন্যের জীবন বাঁচান',
    description:
      'আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে। আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে।'
  },
  {
    icon: HeartPulse,
    title: 'অন্যের জীবন বাঁচান',
    description:
      'আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে। আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে।'
  },
  {
    icon: HeartPulse,
    title: 'অন্যের জীবন বাঁচান',
    description:
      'আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে। আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে।'
  },
  {
    icon: HeartPulse,
    title: 'অন্যের জীবন বাঁচান',
    description:
      'আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে। আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে।'
  },
  {
    icon: HeartPulse,
    title: 'অন্যের জীবন বাঁচান',
    description:
      'আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে। আপনার দিনের একটি সাধারণ রক্তদান অন্য কারো জীবন বাঁচাতে সহায় করতে পারে।'
  }
]

export const contactInfo: TWhydonate[] = [
  { icon: AtSign, title: 'Email', description: 'hello@roktodata.com' },
  { icon: Phone, title: 'Phone', description: '+880 1XXX XXXXXX' },
  { icon: MapPinned, title: 'Address', description: 'College Road, Rangpur' },
  { icon: Sun, title: 'Open hours', description: '24/7' }
]

export const genders = [
  { name: 'পুরুষ', value: 'MALE' },
  { name: 'নারী', value: 'FEMALE' },
  { name: 'অন্যান্য', value: 'OTHERS' }
]

export const userTypes = [
  { name: 'রক্তদাতা', value: 'DONOR' },
  { name: 'রক্ত গ্রহীতা', value: 'RECEIVER' }
]

export const religions = [
  { name: 'ইসলাম', value: 'ISLAM' },
  { name: 'খ্রিষ্টান', value: 'CHRISTIAN' },
  { name: 'হিন্দু', value: 'HINDU' },
  { name: 'বৌদ্ধ', value: 'BUDDHIST' },
  { name: 'অন্যান্য', value: 'OTHERS' }
]
