export type TSiteInfo = typeof siteInfo
export type TNavItem = (typeof siteInfo.navItems)[0]
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
  ]
}
