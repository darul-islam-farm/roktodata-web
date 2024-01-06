'use server'

import { signIn, signOut } from '@/configs/auth'
import { TLogindata } from '@/constants/schema/register'
import { AuthError } from 'next-auth'

import prisma from '@/lib/prisma'

export const createUser = async (data: any) => {
  try {
    const demo = await prisma.user.create({ data })
    return demo
  } catch (error) {
    throw new Error('Error happended')
  }
}

export async function authenticate(formData: TLogindata) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('wrong credentials.')
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
        userType: true,
        status: true
      }
    })
    return user
  } catch (error) {
    throw new Error('no user found')
  }
}

export const logOut = async () => {
  await signOut()
}
