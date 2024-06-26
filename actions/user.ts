/* eslint-disable no-unused-vars */
'use server'

import { auth, signIn, signOut } from '@/configs/auth'
import { alldata, TLogindata } from '@/constants/schema/register'
import { error_res, success_res } from '@/helper/static-response'
import { AuthError } from 'next-auth'

import prisma from '@/lib/prisma'

export const createUser = async (data: any) => {
  const { bloodType, userType: skip, ...rest } = data
  const parseData = alldata.safeParse(rest)
  if (!parseData.success) return error_res('Data validation failed')

  const { age, userType, ...others } = data

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

    const user = await prisma.user.create({
      data: {
        ...others,
        role: userType === 'donor' ? 'DONOR' : 'RECEIVER',
        age: parseInt(age)
      }
    })
    return success_res(user.id)
  } catch {
    return error_res()
  }
}

export const updateUser = async (data: any) => {
  const session = await auth()
  if (!session) return error_res('UnAuthenticated')
  try {
    await prisma.user.update({
      where: {
        id: session.user.userId
      },
      data
    })
    return success_res()
  } catch {
    return error_res('No info updated, try again.')
  }
}

export const checkStatus = async (formData: TLogindata) => {
  const { email, password } = formData
  try {
    const user = await prisma.user.findUnique({
      where: { email, password }
    })

    if (user) {
      if (user.status === 'ACCEPTED') {
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
  try {
    const user = await prisma.user.findUnique({
      where: { email, password },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        status: true,
        role: true,
        donorProfile: {
          select: {
            id: true
          }
        },
        receiverProfile: {
          select: {
            id: true
          }
        }
      }
    })
    return user
      ? {
          id: (user.donorProfile?.id || user.receiverProfile?.id) as string,
          name: user.name,
          email: user.email,
          bloodType: user.bloodType,
          status: user.status,
          role: user.role,
          userId: user.id
        }
      : null
  } catch {
    throw new Error('not found')
  }
}

export const getAppointmentsForDonor = async (id: string) => {
  try {
    const applications = await prisma.appointment.findMany({
      where: {
        donor: {
          id
        }
      },
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        receiver: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    return success_res(applications)
  } catch {
    return error_res()
  }
}

export const logOut = async () => {
  await signOut()
}
