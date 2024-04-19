'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/configs/auth'
import { error_res, success_res } from '@/helper/static-response'

import prisma from '@/lib/prisma'

/** @TODO add auth and role*/

export const getDonorData = async (status: TStatus) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'DONOR',
        status
      }
      /** 
      @temp
       include: {
        donorProfile: {
          include: {
            appointments: true
          }
        }
      }
      */
    })
    return success_res(data)
  } catch {
    return error_res()
  }
}

export const getReceiverData = async (status: TStatus) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'RECEIVER',
        status
      }
    })
    return success_res(data)
  } catch {
    return error_res()
  }
}

export const createOrDeclineDonorProfile = async ({
  id,
  bloodType,
  status
}: {
  id: string
  bloodType: string
  status: TStatus
}) => {
  try {
    if (status === 'ACCEPTED') {
      await prisma.donorProfile.create({
        data: {
          bloodType,
          userId: id
        }
      })
      await prisma.user.update({
        where: { id },
        data: {
          status
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

    revalidatePath('/dashboard/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const createOrDeclineReceiverProfile = async ({
  id,
  bloodType,
  status
}: {
  id: string
  bloodType: string
  status: TStatus
}) => {
  try {
    if (status === 'ACCEPTED') {
      await prisma.receiverProfile.create({
        data: {
          bloodType,
          userId: id
        }
      })
      await prisma.user.update({
        where: { id },
        data: {
          status
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

    revalidatePath('/dashboard/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } })
    revalidatePath('/dashboard/admin', 'layout')
    return success_res()
  } catch {
    return error_res()
  }
}

export const updateAppointmentStatus = async (
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

    revalidatePath('/dashboard/admin', 'layout')
    revalidatePath('/dashboard/donor/appointments', 'page')
    revalidatePath('/dashboard/receiver/appointments', 'page')
    return success_res()
  } catch (error) {
    return error_res()
  }
}

export const declineAppointment = async (
  id: string,
  status: 'CANCELED' | 'REJECTED',
  message?: string
) => {
  try {
    const appointment = await prisma.appointment.findUnique({ where: { id } })

    if (!appointment) return error_res('no appointment found')

    await prisma.declinedAppointment.create({
      data: {
        donor: { connect: { id: appointment.donorId } },
        receiver: { connect: { id: appointment.receiverId } },
        scheduledAt: appointment.scheduledAt,
        status,
        images: appointment.images,
        hospitalInfo: appointment.hospitalInfo,
        address: appointment.address,
        additionalInfo: appointment.additionalInfo,
        cancelMessage: message
      }
    })
    await prisma.appointment.delete({ where: { id } })
    await prisma.receiverProfile.update({
      where: {
        id: appointment.receiverId
      },
      data: {
        userStatus: 'NORMAL'
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

export const deleteDeclinedAppointment = async (id: string) => {
  try {
    await prisma.declinedAppointment.delete({ where: { id } })
    return success_res()
  } catch {
    return error_res()
  }
}

export const deleteAppointment = async (id: string) => {
  try {
    await prisma.appointment.update({
      where: { id },
      data: {
        receiver: {
          update: {
            data: {
              userStatus: 'NORMAL'
            }
          }
        }
      }
    })

    await prisma.appointment.delete({ where: { id } })

    revalidatePath('/dashboard/admin', 'layout')
    revalidatePath('/dashboard/donor/appointments', 'page')
    revalidatePath('/dashboard/receiver/appointments', 'page')
    return success_res()
  } catch (error) {
    return error_res()
  }
}

export const createAdmin = async (email: string, password: string) => {
  const session = await auth()
  if (session?.user.role !== 'ADMIN') return error_res('UnAuthenticated')
  try {
    await prisma.admin.create({
      data: {
        email,
        password
      }
    })
    return success_res()
  } catch {
    return error_res()
  }
}

export const getModsList = async (
  type: 'PENDING' | 'ACCEPTED' | 'REJECTED'
) => {
  try {
    const mods = await prisma.moderator.findMany({ where: { status: type } })
    return success_res(mods)
  } catch {
    return error_res()
  }
}

export const updateModStatus = async (
  id: string,
  status: 'ACCEPTED' | 'REJECTED'
) => {
  try {
    await prisma.moderator.update({
      where: { id },
      data: { status }
    })

    revalidatePath('/dashboard/admin/mod-list', 'page')
    revalidatePath('/dashboard/admin/mod-requests', 'page')
    return success_res()
  } catch {
    return error_res()
  }
}

export const deleteMod = async (id: string) => {
  try {
    await prisma.moderator.delete({
      where: { id }
    })
    revalidatePath('/dashboard/admin/mod-list', 'page')
    revalidatePath('/dashboard/admin/mod-rejected', 'page')
    return success_res()
  } catch {
    return error_res()
  }
}

export const getAdmin = async (email: any, password: any) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email, password }
    })
    return admin
      ? {
          id: admin.id,
          email: admin.email,
          role: 'ADMIN' as TRole,
          name: '',
          bloodType: '',
          status: ''
        }
      : null
  } catch {
    throw new Error('not found')
  }
}
