import {
  ActivitySquare,
  AtSign,
  Dumbbell,
  GaugeCircle,
  HeartCrack,
  HeartPulse,
  LucideIcon,
  MapPinned,
  Phone,
  Sun,
  Table
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
    title: 'সজীব রক্তকণিকা তৈরি করে',
    description:
      'রক্তদান করার সঙ্গে সঙ্গে শরীরের মধ্যে অবস্থিত ‘বোন ম্যারো’ নতুন কণিকা তৈরির জন্য উদ্দীপ্ত হয় এবং রক্তদানের ২ সপ্তাহের মধ্যে নতুন রক্তকণিকার জন্ম হয়ে ঘাটতি পূরণ হয়ে যায়। বছরে ৩ বার রক্তদানে শরীরে লোহিত কণিকাগুলোর প্রাণবন্ততা বাড়িয়ে তোলার সাথে সাথে নতুন কণিকা তৈরির হার বাড়িয়ে দেয়।'
  },
  {
    icon: HeartCrack,
    title: 'হৃদরোগের ঝুঁকি কমায়',
    description:
      'নিয়মিত রক্তদান করলে হৃদরোগ ও হার্ট অ্যাটাকের (মায়োকার্ডিয়াল ইনফার্কশান) ঝুঁকি অনেকটাই কমে যায়।'
  },
  {
    icon: GaugeCircle,
    title: 'উচ্চরক্তচাপ কমাতে সাহায্য করে',
    description: 'রক্তদান হাইপারটেনশান বা উচ্চরক্তচাপ কমাতে বিশেষ ভূমিকা রাখে।।'
  },
  {
    icon: Table,
    title: 'বিভিন্ন ক্যান্সারের ঝুঁকি হ্রাস করে',
    description:
      'যারা বছরে দুই বার রক্ত দেয়, অন্যদের তুলনায় তাদের ক্যান্সারে আক্রান্ত হওয়ার ঝুঁকি কম থাকে। বিশেষ করে ফুসফুস, লিভার, কোলন, পাকস্থলী ও গলার ক্যান্সারের ঝুঁকি নিয়মিত রক্তদাতাদের ক্ষেত্রে অনেক কম পরিলক্ষিত হয়েছে।'
  },
  {
    icon: ActivitySquare,
    title: 'বিভিন্ন স্বাস্থ্যপরীক্ষা করা যায়',
    description:
      'নিয়মিত স্বেচ্ছায় রক্তদানের মাধ্যমে নিজের শরীরে বড় কোনো রোগ আছে কিনা তা বিনা খরচে জানা যায়। যেমন: হেপাটাইটিস-বি, হেপাটাইটিস-সি, সিফিলিস, এইচআইভি (এইডস) ইত্যাদি।'
  },
  {
    icon: Dumbbell,
    title: 'ওজন স্বাভাবিক করতে ভূমিকা রাখে',
    description:
      'প্রতি পাইন্ট (এক গ্যালনের আট ভাগের এক ভাগ) রক্ত দিলে ৬৫০ ক্যালরি করে শক্তি খরচ হয়। অর্থাৎ ওজন কমানোর ক্ষেত্রেও এটি গুরুত্বপূর্ণ ভূমিকা রাখতে পারে। রক্তদান করার মাত্র ৪৮ ঘণ্টার মধ্যেই দেহে রক্তের পরিমাণ স্বাভাবিক হয়ে যায়।'
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
