'use server'

import { revalidatePath } from 'next/cache'
import { error_res, success_res } from '@/helper/static-response'

import prisma from '@/lib/prisma'

/** @TODO add auth and role*/

export const getDonorData = async (status: TStatus) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        status
      },
      include: {
        donorProfile: {
          include: {
            appointments: true
          }
        }
      }
    })
    return success_res(data)
  } catch {
    return error_res()
  }
}

export const getReceiverData = async (status: TStatus) => {
  try {
    const data = await prisma.receiver.findMany({
      where: {
        status
      }
    })
    return success_res(data)
  } catch {
    return error_res()
  }
}

export const createDonorProfile = async (data: {
  bloodType: string
  id: string
  status: TStatus
}) => {
  const { bloodType, id, status } = data
  try {
    if (status === 'ACCEPTED') {
      await prisma.donorProfile.create({
        data: {
          bloodType,
          userId: id
        }
      })
    }
    await prisma.user.update({
      where: {
        id
      },
      data: {
        status
      }
    })

    revalidatePath('/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const updateReceiverProfile = async (data: {
  id: string
  status: TStatus
}) => {
  const { id, status } = data
  try {
    await prisma.receiver.update({
      where: {
        id
      },
      data: {
        status
      }
    })

    revalidatePath('/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const deleteUser = async (id: string, userType: TUserType) => {
  try {
    if (userType === 'DONOR') {
      await prisma.user.delete({ where: { id } })
      revalidatePath('/admin', 'layout')
      return success_res()
    } else if (userType === 'RECEIVER') {
      await prisma.receiver.delete({ where: { id } })
      revalidatePath('/admin', 'layout')
      return success_res()
    }

    return error_res('Unknown type')
  } catch {
    return error_res()
  }
}

export const verifyAppointment = async (
  id: string,
  status: TAppointmentStatus
) => {
  try {
    await prisma.appointment.update({
      where: { id },
      data: {
        status
      }
    })

    revalidatePath('/admin', 'layout')
    revalidatePath('/dashboard/donor/appointments', 'page')
    return success_res()
  } catch (error) {
    return error_res()
  }
}

export const deleteAppointment = async (id: string) => {
  try {
    await prisma.appointment.delete({ where: { id } })

    revalidatePath('/admin', 'layout')
    return success_res()
  } catch (error) {
    return error_res()
  }
}
