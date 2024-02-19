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
  icon?: LucideIcon
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
    { name: 'ড্যাশবোর্ড', link: '/dashboard/donor', icon: LayoutDashboard },
    {
      name: 'আমার ডোনেশন',
      link: '/dashboard/donor/donations',
      icon: HeartPulse
    },
    { name: 'রিভিউ', link: '/dashboard/donor/reviews', icon: Star },
    { name: 'প্রোফাইল', link: '/dashboard/donor/profile', icon: UserCog2 },
    { name: 'সেটিংস', link: '/dashboard/donor/settings', icon: Settings2Icon }
  ],
  userDashboardItem: [
    { name: 'User', link: '/dashboard/receiver', icon: LayoutDashboard }
  ],
  adminDashboardItem: [
    { name: 'ডোনার রিকুয়েস্ট', link: '/admin', icon: HeartPulseIcon },
    {
      name: 'রিসিভার রিকুয়েস্ট',
      link: '/admin/receiver-requests',
      icon: Syringe
    },
    {
      name: 'আবেদনসমূহ',
      link: '/admin/appointments',
      icon: ScrollText
    },
    { name: 'সকল ডোনার', link: '/admin/all-donors', icon: HeartPulseIcon },
    {
      name: 'সকল রিসিভার',
      link: '/admin/all-receivers',
      icon: Syringe
    },
    { name: 'সেটিংস', link: '/admin/settings', icon: Settings2 }
  ]
}

export const api =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://roktodata.vercel.app'
