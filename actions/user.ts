'use server'

import prisma from '@/lib/prisma'

export const createUser = async (data: any) => {
  try {
    const demo = await prisma.user.create({ data })
    console.log('demo', demo)
  } catch (error) {
    console.log('error happended', error)
  }
}
