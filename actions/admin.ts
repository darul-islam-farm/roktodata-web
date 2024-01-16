'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

const errorText = 'Something went wrong'

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
    return { data }
  } catch {
    return { error: errorText }
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
      await prisma.donorProfile.create({
        data: {
          bloodType,
          userId
        }
      })
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          status: 'ACCEPTED'
        }
      })

      revalidatePath('/admin', 'layout')
      return { ok: true }
    } else if (userType === 'RECEIVER') {
      await prisma.receiverProfile.create({
        data: {
          bloodType,
          userId
        }
      })
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          status: 'ACCEPTED'
        }
      })

      revalidatePath('/admin', 'layout')
      return { ok: true }
    } else return { error: 'Unavailable profile type' }
  } catch {
    return { error: errorText }
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } })
    return { ok: true }
  } catch {
    return { error: 'No user deleted' }
  }
}
