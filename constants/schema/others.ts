import * as z from 'zod'

export const searchdata = z.object({
  bloodType: z.string().min(1, 'রক্তের গ্রুপ নির্বাচন করুন'),
  jilla: z.string().min(2, 'জেলা নির্বাচন করুন'),
  religion: z.string().optional(),
  age: z.string().optional()
})

export const hospitalData = z.object({
  name: z.string().min(1, 'field is required'),
  phone: z.string().min(1, 'field is required'),
  email: z.string().email('correct email address is required'),
  jilla: z.string().min(1, 'field is required'),
  subJilla: z.string().min(1, 'field is required'),
  thana: z.string().min(1, 'field is required'),
  address: z.string().min(1, 'field is required'),
  open: z.string().min(1, 'field is required')
})

export type TSearchdata = z.infer<typeof searchdata>
export type THospitalData = z.infer<typeof hospitalData>
