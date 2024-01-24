import * as z from 'zod'

export const searchdata = z.object({
  bloodType: z.string().min(1, 'রক্তের গ্রুপ নির্বাচন করুন'),
  jilla: z.string().min(2, 'জেলা নির্বাচন করুন'),
  religion: z.string().optional(),
  ageFrom: z.string().optional(),
  ageTo: z.string().optional()
})

export type TSearchdata = z.infer<typeof searchdata>
