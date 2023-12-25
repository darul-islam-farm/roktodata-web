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
    { name: 'Dashboard', link: '/dashboard/donor', icon: LayoutDashboard },
    { name: 'My Donations', link: '/dashboard/donor', icon: HeartPulse },
    { name: 'My Reviews', link: '/dashboard/donor', icon: Star },
    { name: 'Profile', link: '/dashboard/donor', icon: UserCog2 },
    { name: 'Settings', link: '/dashboard/donor', icon: Settings2Icon }
  ],
  userDashboardItem: [{ name: 'Dashboard', link: '/dashboard/receiver' }]
}
