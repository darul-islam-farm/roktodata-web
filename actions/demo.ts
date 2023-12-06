'use server'

import prisma from '@/lib/prisma'

export const create = async (data: FormData) => {
  const name = data.get('name')
  if (!name) throw Error('Missing name')
  try {
    const demo = await prisma.message.deleteMany()
    console.log('demo', demo)
  } catch (error) {
    console.log('error happended', error)
  }
}
