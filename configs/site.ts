import {
  HeartPulse,
  HeartPulseIcon,
  LayoutDashboard,
  LucideIcon,
  ScrollText,
  Settings2,
  Settings2Icon,
  Star,
  Syringe,
  UserCog2
} from 'lucide-react'

export type TSiteInfo = typeof siteInfo
export type TNavItem = {
  name: string
  href: string
  icon: LucideIcon
  child?: {
    name: string
    href: string
  }[]
}
export const siteInfo = {
  name: 'রক্তদাতা',
  description: 'ব্লাড ডোনেশন এপ্লিকেশন',
  authors: {
    url: 'https://fb.com/rabibinsalam',
    name: 'Rabius Sunny'
  },
  generator:
    'রক্তদাতা রক্ত দাতা ব্লাড ডোনেশন রক্তদান রক্তগ্রহণ blood blood-donation donation donate blood blood-groups',
  navItems: [
    { name: 'হোম', href: '/' },
    { name: 'আমাদের সম্পর্কে', href: '/about-us' },
    { name: 'সাহায্য', href: '/admin' },
    { name: 'ফোরাম', href: '/dashboard/receiver' },
    { name: 'যোগাযোগ', href: '/contact' }
  ],
  donorDashboardItem: [
    { name: 'ড্যাশবোর্ড', href: '/dashboard/donor', icon: LayoutDashboard },
    {
      name: 'আবেদন',
      href: '/dashboard/donor/appointments',
      icon: ScrollText
    },
    {
      name: 'আমার ডোনেশন',
      href: '/dashboard/donor/donations',
      icon: HeartPulse
    },
    { name: 'রিভিউ', href: '/dashboard/donor/reviews', icon: Star },
    { name: 'প্রোফাইল', href: '/dashboard/donor/profile', icon: UserCog2 },
    { name: 'সেটিংস', href: '/dashboard/donor/settings', icon: Settings2Icon }
  ],
  userDashboardItem: [
    { name: 'প্রোফাইল', href: '/dashboard/receiver', icon: UserCog2 },
    {
      name: 'আবেদন',
      href: '/dashboard/receiver/appointments',
      icon: ScrollText
    },
    {
      name: 'রক্তপ্রাপ্তি',
      href: '/dashboard/receiver/receipts',
      icon: ScrollText
    }
  ],
  adminDashboardItem: [
    { name: 'ডোনার রিকুয়েস্ট', href: '/dashboard/admin', icon: HeartPulseIcon },
    {
      name: 'রিসিভার রিকুয়েস্ট',
      href: '/dashboard/admin/receiver-requests',
      icon: Syringe
    },
    {
      name: 'আবেদনসমূহ',
      href: '/dashboard/admin/appointments',
      icon: ScrollText,
      child: [
        {
          name: 'আনভেরিফাইড আবেদন',
          href: '/dashboard/admin/appointments/unverified'
        },
        {
          name: 'পেন্ডিং আবেদন',
          href: '/dashboard/admin/appointments/pending'
        },
        { name: 'গৃহীত আবেদন', href: '/dashboard/admin/appointments/accepted' },
        {
          name: 'অস্বীকৃত আবেদন',
          href: '/dashboard/admin/appointments/canceled'
        },
        {
          name: 'রিজেক্টেড আবেদন',
          href: '/dashboard/admin/appointments/rejected'
        }
      ]
    },
    {
      name: 'সকল ডোনার',
      href: '/dashboard/admin/all-donors',
      icon: HeartPulseIcon
    },
    {
      name: 'সকল রিসিভার',
      href: '/dashboard/admin/all-receivers',
      icon: Syringe
    },
    { name: 'সেটিংস', href: '/dashboard/admin/settings', icon: Settings2 }
  ]
}

export const api =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://roktodata.onrender.com'
