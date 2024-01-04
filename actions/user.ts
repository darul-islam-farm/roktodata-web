'use server'

import prisma from '@/lib/prisma'

export const createUser = async (data: any) => {
  try {
    const demo = await prisma.user.create({ data })
    return demo
  } catch (error) {
    throw new Error('Error happended')
  }
}
