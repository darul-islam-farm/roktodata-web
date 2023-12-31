import {
  HeartPulse,
  LayoutDashboard,
  LucideIcon,
  Settings2Icon,
  Star,
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
    { name: 'সাহায্য', href: '/help' },
    { name: 'ফোরাম', href: '/forum' },
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
  userDashboardItem: [{ name: 'Dashboard', link: '/dashboard/receiver' }]
}

export const api =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://roktodata.vercel.app'
