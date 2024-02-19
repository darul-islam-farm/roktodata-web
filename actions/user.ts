/* eslint-disable no-unused-vars */
'use server'

import { signIn, signOut } from '@/configs/auth'
import { alldata, TLogindata } from '@/constants/schema/register'
import { error_res, success_res } from '@/helper/static-response'
import { AuthError } from 'next-auth'

import prisma from '@/lib/prisma'

export const createUser = async (data: any) => {
  const { bloodType, ...rest } = data
  const parseData = alldata.safeParse(rest)
  if (!parseData.success) return error_res('Data validation failed')

  const { age, ...others } = data

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

    await prisma.user.create({
      data: {
        ...others,
        age: parseInt(age)
      }
    })
    return success_res()
  } catch {
    return error_res()
  }
}

export const createReceiver = async (data: any) => {
  const { bloodType, ...rest } = data
  const parseData = alldata.safeParse(rest)
  if (!parseData.success) return error_res('Data validation failed')

  const { age, ...others } = data

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

    const receiver = await prisma.receiver.create({
      data: {
        ...others,
        age: parseInt(age)
      }
    })
    return success_res(receiver.id)
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

export const checkStatus = async (formData: TLogindata) => {
  const { email, password } = formData
  try {
    const donor = await prisma.user.findUnique({
      where: { email, password }
    })
    const receiver = await prisma.receiver.findUnique({
      where: { email, password }
    })

    if (donor || receiver) {
      if (donor?.status === 'ACCEPTED' || receiver?.status === 'ACCEPTED') {
        return success_res()
      } else {
        return error_res(
          'আপনার একাউন্টটি এখনো ভেরিফাই করা হয়নি। হলে জানিয়ে দেয়া হবে।'
        )
      }
    } else {
      return error_res('ভুল ইমেইল অথবা পাসওয়ার্ড')
    }
  } catch {
    return error_res()
  }
}

export const authenticate = async (formData: TLogindata) => {
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
    const donor = await prisma.user.findUnique({
      where: { email, password },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        status: true,
        role: true
      }
    })
    const receiver = await prisma.receiver.findUnique({
      where: { email, password },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        status: true,
        role: true
      }
    })
    return donor || receiver
  } catch {
    throw new Error('not found')
  }
}

export const logOut = async () => {
  await signOut()
}
