import * as z from 'zod'

export const appointmentSchema = z.object({
  hospitalInfo: z.string().min(10, 'হাসপাতালের তথ্য দিন।'),
  address: z.string().min(10, 'বর্তমান ঠিকানা দিন।'),
  additionalInfo: z.string().optional()
})

export type TAppointmentData = z.infer<typeof appointmentSchema>
