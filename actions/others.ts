'use server'

import { TSearchdata } from '@/constants/schema/others'

import prisma from '@/lib/prisma'

export const getSearchedDonor = async ({ bloodType, jilla }: TSearchdata) => {
  try {
    const data = prisma.user.findMany({
      where: {
        status: 'ACCEPTED',
        bloodType,
        jilla,
        userType: 'DONOR'
      }
    })
    return data
  } catch (error) {
    throw new Error('Something went wrong')
  }
}
