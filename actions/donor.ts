'use server'

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
