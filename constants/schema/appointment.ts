import * as z from 'zod'

export const appointmentSchema = z.object({
  hospitalInfo: z.string().min(10, 'হাসপাতালের তথ্য দিন।'),
  address: z.string().min(10, 'বর্তমান ঠিকানা দিন।'),
  scheduledAt: z.string().min(10, 'তারিখ ও সময় বেছে নিন।'),
  additionalInfo: z.string().optional()
})

export type TAppointmentData = z.infer<typeof appointmentSchema>
