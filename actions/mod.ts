'use server'

import { TLogindata } from '@/constants/schema/register'
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

export const checkModStatus = async ({ email, password }: TLogindata) => {
  try {
    const mod = await prisma.moderator.findUnique({
      where: { email, password }
    })

    if (mod) {
      if (mod.status === 'ACCEPTED') {
        return success_res()
      } else {
        return error_res(
          'আপনার একাউন্টটি এখনো ভেরিফাই করা হয়নি। ভেরিফিকেশনের পর জানিয়ে দেয়া হবে।'
        )
      }
    } else {
      return error_res('ভুল ইমেইল অথবা পাসওয়ার্ড')
    }
  } catch {
    return error_res()
  }
}
