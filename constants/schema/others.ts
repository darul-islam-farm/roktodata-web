import * as z from 'zod'

export const searchdata = z.object({
  bloodType: z.string().min(1, 'রক্তের গ্রুপ নির্বাচন করুন'),
  jilla: z.string().min(2, 'জেলা নির্বাচন করুন')
})

export type TSearchdata = z.infer<typeof searchdata>
