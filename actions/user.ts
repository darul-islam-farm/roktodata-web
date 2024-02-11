'use server'

import { signIn, signOut } from '@/configs/auth'
import { alldata, TCreddata } from '@/constants/schema/register'
import { error_res, success_res } from '@/helper/static-response'
import { AuthError } from 'next-auth'

import prisma from '@/lib/prisma'

export const createDonor = async (data: any) => {
  const { bloodType, ...rest } = data
  const parseData = alldata.safeParse(data)
  if (!parseData.success) return error_res('Data validation failed')

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
      return error_res(
        'ইমেইল, আইডি কার্ড নম্বর অথবা ফোন নম্বর ইতোমধ্যে ব্যবহৃত হয়েছে।'
      )

    if (true) {
      await prisma.user.create({
        data: {
          ...rest,
          bloodType
        }
      })
    }
    return success_res()
  } catch {
    return error_res()
  }
}
export const createReceiver = async (data: any) => {
  const { bloodType, ...rest } = data
  const parseData = alldata.safeParse(data)
  if (!parseData.success) return error_res('Data validation failed')

  try {
    const isDuplicate = await prisma.receiver.findMany({
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
      return error_res(
        'ইমেইল, আইডি কার্ড নম্বর অথবা ফোন নম্বর ইতোমধ্যে ব্যবহৃত হয়েছে।'
      )

    if (true) {
      await prisma.receiver.create({
        data: {
          ...rest,
          bloodType
        }
      })
    }
    return success_res()
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
    return success_res()
  } catch {
    return error_res('No info updated, try again.')
  }
}

export const authenticate = async (formData: TCreddata) => {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('credential error')
        default:
          throw new Error('Something went wrong')
      }
    }
    throw error
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
