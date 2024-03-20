'use server'

import { revalidatePath } from 'next/cache'
import { TSearchdata } from '@/constants/schema/others'
import removeProperties from '@/helper/removeProperties'
import { error_res, success_res } from '@/helper/static-response'
import { UTApi } from 'uploadthing/server'

import prisma from '@/lib/prisma'

const utapi = new UTApi()

export const getSearchedDonor = async (data: TSearchdata) => {
  const { bloodType, jilla, religion, ageFrom, ageTo } = removeProperties(data)

  try {
    const data = await prisma.donorProfile.findMany({
      where: {
        status: 'ACTIVE',
        bloodType,
        user: {
          jilla,
          religion,
          age: {
            gte: Number(ageFrom ?? 18),
            lte: Number(ageTo ?? 50)
          }
        }
      },
      include: {
        user: {
          select: {
            jilla: true,
            subJilla: true,
            address: true,
            thana: true,
            bloodType: true,
            name: true,
            email: true
          }
        }
      }
    })
    return data as any
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export const uploadFiles = async (formData: FormData) => {
  const files = formData.getAll('files')
  try {
    const res = await utapi.uploadFiles(files)
    return success_res(res.map((item) => item.data?.key))
  } catch (error) {
    console.log('error on uploading ', error)
    throw new Error('something went wrong')
  }
}

export const checkAppointmentAvailablity = async (
  donor: string,
  receiver: string
) => {
  try {
    const donorRes = await prisma.donorProfile.findUnique({
      where: { id: donor }
    })
    const userRes = await prisma.receiver.findUnique({
      where: { id: receiver }
    })
    const hasReceiverAppointment = await prisma.appointment.findUnique({
      where: { receiverId: receiver }
    })
    if (!donorRes || !userRes)
      return error_res(
        'কোনো ইউজার অথবা ডোনার ডাটা পাওয়া যায়নি। আবার চেষ্টা করুন।'
      )
    if (hasReceiverAppointment) {
      return error_res(
        'আপনি ইতোমধ্যে একটি আবেদন করেছেন। সেটির ফলাফল জানিয়ে দেয়া হলে আবার আবেদন করতে পারবেন।'
      )
    }
    return success_res()
  } catch {
    return error_res()
  }
}

export const createAppointment = async (data: any) => {
  const { donor, receiver, ...rest } = data
  try {
    await prisma.appointment.create({
      data: {
        donor: { connect: { id: donor } },
        receiver: { connect: { id: receiver } },
        ...rest
      }
    })
    await prisma.receiver.update({
      where: {
        id: receiver
      },
      data: {
        userStatus: 'REQUESTED'
      }
    })

    revalidatePath('/dashboard/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const getAppointments = async () => {
  try {
    const applications = await prisma.appointment.findMany({
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        receiver: {
          select: {
            name: true
          }
        }
      }
    })
    return success_res(applications)
  } catch {
    return error_res()
  }
}

export const getDeclinedAppointments = async () => {
  try {
    const appointments = await prisma.declinedAppointment.findMany({
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        receiver: {
          select: {
            name: true
          }
        }
      }
    })
    return success_res(appointments)
  } catch {
    return error_res()
  }
}

export const getAppointmentForUser = async (id: string) => {
  try {
    const applications = await prisma.appointment.findUnique({
      where: { receiverId: id },
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true,
                jilla: true,
                subJilla: true,
                thana: true,
                address: true,
                phone: true,
                phone2: true
              }
            }
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            jilla: true,
            subJilla: true,
            thana: true,
            address: true
          }
        }
      }
    })
    return success_res(applications)
  } catch {
    return error_res()
  }
}

export const getUserStatus = async (id: string) => {
  try {
    const user = await prisma.receiver.findUnique({ where: { id } })
    if (!user) return error_res('কোনো ইউজার পাওয়া যায়নি, আবার চেষ্টা করুন।')
    return success_res({
      profileStatus: user?.status,
      requestStatus: user?.userStatus
    })
  } catch {
    return error_res()
  }
}

export const getDonations = async () => {
  try {
    const data = await prisma.donation.findMany({
      include: {
        receiver: {
          select: {
            name: true,
            religion: true,
            bloodType: true,
            jilla: true,
            subJilla: true,
            thana: true,
            address: true,
            phone: true,
            phone2: true
          }
        },
        donor: {
          include: {
            user: {
              select: {
                name: true,
                religion: true,
                bloodType: true,
                jilla: true,
                subJilla: true,
                thana: true,
                address: true,
                phone: true,
                phone2: true
              }
            }
          }
        }
      }
    })
    return success_res(data)
  } catch {
    return error_res()
  }
}
