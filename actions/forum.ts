'use server'

import { revalidatePath } from 'next/cache'
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

export const getOwnForums = async () => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    const forums = await prisma.forum.findMany({
      where: { authorId: session.user.userId }
    })
    return success_res(forums)
  } catch {
    return error_res()
  }
}

export const editForum = async (id: string, data: {}) => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    await prisma.forum.update({
      where: { id, authorId: session.user.userId },
      data
    })
    revalidatePath('/dashboard/receiver/forums')
    return success_res()
  } catch {
    return error_res()
  }
}

export const deleteForum = async (id: string) => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    await prisma.forum.delete({
      where: { id, authorId: session.user.userId }
    })
    revalidatePath('/dashboard/receiver/forums')
    return success_res()
  } catch {
    return error_res()
  }
}

export const getSingleForum = async (id: string) => {
  try {
    const forum = await prisma.forum.findUnique({ where: { id } })
    return success_res(forum)
  } catch {
    return error_res()
  }
}

export const postForum = async (
  data: any,
  id: string,
  donationPost?: boolean
) => {
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
    donationPost && revalidatePath('/dashboard/receiver', 'layout')
    return success_res()
  } catch {
    return error_res()
  }
}
