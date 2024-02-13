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
      }
    })
    return success_res(data)
  } catch {
    return error_res()
  }
}

export const createDonorProfile = async (data: {
  bloodType: string
  userId: string
  action: TStatus
}) => {
  const { bloodType, userId, action } = data
  try {
    if (action === 'ACCEPTED') {
      await prisma.donorProfile.create({
        data: {
          bloodType,
          userId
        }
      })
    }
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        status: action
      }
    })

    revalidatePath('/admin', 'layout')

    return success_res()
  } catch {
    return error_res()
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } })
    return success_res()
  } catch {
    return error_res()
  }
}
