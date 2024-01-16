'use server'

import { signIn, signOut } from '@/configs/auth'
import { TCreddata } from '@/constants/schema/register'
import { error_res, success_res } from '@/helper/static-response'
import { AuthError } from 'next-auth'

import prisma from '@/lib/prisma'

export const createUser = async (data: any) => {
  // TODO: Add data validation with appropriate schema and safeParse from zod
  try {
    const isDuplicate = await prisma.user.findMany({
      where: {
        OR: [
          { email: data.email },
          { identity: data.identity },
          { phone: data.phone },
          { phone2: data.phone2 }
        ]
      }
    })
    if (isDuplicate.length)
      return {
        error: 'ইমেইল, আইডি কার্ড নম্বর অথবা ফোন নং ইউনিক হতে হবে।',
        ok: false
      }

    await prisma.user.create({ data })
    return success_res
  } catch {
    return error_res()
  }
}

export const updateUser = async (data: any) => {
  const { id, ...rest } = data
  try {
    await prisma.user.update({
      where: {
        id
      },
      data: rest
    })
    return success_res
  } catch {
    return error_res('No info updated, try again.')
  }
}

export const authenticate = async (formData: TCreddata) => {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin')
        return error_res('wrong email or password ')
    }
    return error_res()
  }
}

export const getUser = async (email: any, password: any) => {
  // get user data for authentication
  try {
    const user = await prisma.user.findUnique({
      where: { email, password },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        userType: true,
        status: true
      }
    })
    return user
  } catch {
    throw new Error('not found')
  }
}

export const logOut = async () => {
  await signOut()
}
