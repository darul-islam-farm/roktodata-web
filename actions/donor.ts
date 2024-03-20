'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/configs/auth'
import { error_res, success_res } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export const updateActiveStatus = async (status: 'ACTIVE' | 'INACTIVE') => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    await prisma.donorProfile.update({
      where: { userId: session.user.id },
      data: {
        status
      }
    })
    return success_res()
  } catch {
    return error_res()
  }
}

export const acceptAppointment = async (id: string) => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    await prisma.appointment.update({
      where: { id },
      data: {
        status: 'ACCEPTED'
      }
    })
    await prisma.donorProfile.update({
      where: { id: session.user.id },
      data: {
        status: 'INACTIVE'
      }
    })

    revalidatePath('/dashboard/admin', 'layout')
    revalidatePath('/dashboard/donor/appointments', 'page')
    revalidatePath('/dashboard/receiver/appointments', 'page')
    return success_res()
  } catch (error) {
    return error_res()
  }
}

export const createDonation = async (appId: string, image?: string) => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appId }
    })
    if (!appointment) return error_res('no appointment found')
    await prisma.donation.create({
      data: {
        donorId: appointment.donorId,
        receiverId: appointment.receiverId,
        address: appointment.address,
        donatedAt: appointment.scheduledAt,
        image
      }
    })
    await prisma.receiver.update({
      where: { id: appointment.receiverId },
      data: {
        userStatus: 'NORMAL'
      }
    })
    await prisma.appointment.delete({ where: { id: appId } })

    revalidatePath('/dashboard/admin', 'layout')
    revalidatePath('/dashboard/donor/appointments', 'page')
    revalidatePath('/dashboard/receiver/appointments', 'page')
    return success_res()
  } catch {
    return error_res()
  }
}
