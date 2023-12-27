import * as z from 'zod'

export const basicdata = z.object({
  name: z.string().min(4, 'আসল নাম আবশ্যক।'),
  identity: z.string().min(10, 'সঠিক পরিচয়পত্র নম্বর দিন।'),
  gender: z.string().min(2, 'লিঙ্গ নির্বাচন আবশ্যক।'),
  phone: z.string().min(11, 'সঠিক ফোন নাম্বার দিন।'),
  phone2: z.string().min(11, 'সঠিক ফোন নাম্বার দিন।'),
  userType: z.string().min(3, 'আপনি কি রক্তদাতা অথবা রক্তগ্রহীতা? ')
})
export const locationdata = z.object({
  jilla: z.string().min(2, 'জেলার নাম আবশ্যক।'),
  subJilla: z.string().min(2, 'উপজেলার নাম আবশ্যক।'),
  thana: z.string().min(2, 'থানার নাম আবশ্যক।'),
  address: z.string().min(10, 'বিস্তারিত ঠিকানা আবশ্যক।')
})
export const creddata = z.object({
  email: z.string().email('সঠিক ইমেইল অ্যাড্রেস আবশ্যক।'),
  password: z.string().min(6, 'পাসওয়ার্ড অন্তত ৬ সংখ্যার হতে হবে।')
})
export const logindata = z.object({
  username: z.string().min(4, {
    message: 'অন্তত চার সংখ্যার ইউজারনেম অথবা ইমেইল দিন।'
  }),
  password: z.string().min(6, 'পাসওয়ার্ড অন্তত ৬ সংখ্যার হতে হবে।')
})
export type TBasicdata = z.infer<typeof basicdata>
export type TLocationdata = z.infer<typeof locationdata>
export type TCreddata = z.infer<typeof creddata>
export type TLogindata = z.infer<typeof logindata>
