'use server'

import { revalidatePath } from 'next/cache'
import adminErrorMessage from '@/helper/adminErrorMessage'

import prisma from '@/lib/prisma'

/*
 * TODO: add auth if needed
 */

export const getRequester = async (userType: TUserType, status: TStatus) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        userType,
        status
      }
    })
    return data
  } catch (error) {
    throw adminErrorMessage(error)
  }
}

export const createProfile = async (data: {
  bloodType: string
  userId: string
  userType: TUserType
}) => {
  const { bloodType, userId, userType } = data
  try {
    if (userType === 'DONOR') {
      const res = await prisma.donorProfile.create({
        data: {
          bloodType,
          userId
        }
      })
      const accept = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          status: 'ACCEPTED'
        }
      })

      revalidatePath('/admin', 'layout')
      return res
    } else if (userType === 'RECEIVER') {
      const res = await prisma.receiverProfile.create({
        data: {
          bloodType,
          userId
        }
      })
      const accept = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          status: 'ACCEPTED'
        }
      })

      revalidatePath('/admin', 'layout')
      return res
    } else throw new Error('unavaliable profile type')
  } catch (error) {
    throw error
  }
}
