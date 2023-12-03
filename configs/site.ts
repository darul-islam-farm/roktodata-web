export type TSiteInfo = typeof siteInfo
export type TNavItem = typeof siteInfo.navItems
export const siteInfo = {
  name: 'রক্তদাতা',
  description: 'ব্লাড ডোনেশন এপ্লিকেশন',
  authors: {
    url: 'https://fb.com/rabibinsalam',
    name: 'Rabius Sunny',
  },
  generator:
    'রক্তদাতা রক্ত দাতা ব্লাড ডোনেশন রক্তদান রক্তগ্রহণ blood blood-donation donation donate blood blood-groups',
  navItems: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
    { name: 'Others', href: '/others' },
  ],
}
