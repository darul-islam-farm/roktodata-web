'use server'

import { auth } from '@/configs/auth'
import adminErrorMessage from '@/helper/adminErrorMessage'

import prisma from '@/lib/prisma'

export const getDonor = async (type: string) => {
  const isAuth = await auth()
  try {
    if (!isAuth) {
      throw new Error('UnAuthenticated')
    }
    const data = await prisma.user.findMany({
      where: {
        userType: type as any
      }
    })
    return data
  } catch (error) {
    throw adminErrorMessage(error, !!isAuth)
  }
}
