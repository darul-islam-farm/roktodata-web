'use server'

import { auth } from '@/configs/auth'
import { error_res, success_res } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export const getForums = async () => {
  try {
    const forums = await prisma.forum.findMany()
    return success_res(forums)
  } catch {
    return error_res()
  }
}

export const postForum = async (data: any, id: string) => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    await prisma.forum.create({ data })
    await prisma.donation.update({
      where: { id },
      data: {
        shared: true
      }
    })
    return success_res()
  } catch {
    return error_res()
  }
}
