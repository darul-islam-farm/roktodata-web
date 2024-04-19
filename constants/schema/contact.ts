import * as z from 'zod'

export const contactdata = z.object({
  name: z.string().min(4, 'আসল নাম আবশ্যক।'),
  email: z.string().email('সঠিক ইমেইল অ্যাড্রেস আবশ্যক।'),
  subject: z.string().optional(),
  message: z.string().min(10, 'বিস্তারিত লিখুন।')
})

export type TContactData = z.infer<typeof contactdata>
