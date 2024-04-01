'use server'

import { error_res, success_res } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export const createMod = async (data: any) => {
  try {
    await prisma.moderator.create({ data })
    return success_res()
  } catch (err) {
    console.log('err on action', err)
    return error_res()
  }
}

export const getMod = async (email: any, password: any) => {
  try {
    const mod = await prisma.moderator.findUnique({
      where: { email, password, status: 'ACCEPTED' }
    })
    return mod
      ? {
          id: mod.id,
          email: mod.email,
          role: 'MODERATOR' as TRole,
          name: '',
          bloodType: '',
          status: ''
        }
      : null
  } catch {
    throw new Error('not found')
  }
}
