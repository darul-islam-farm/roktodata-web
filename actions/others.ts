'use server'

import { TSearchdata } from '@/constants/schema/others'
import removeProperties from '@/helper/removeProperties'

import prisma from '@/lib/prisma'

export const getSearchedDonor = async (data: TSearchdata) => {
  const { bloodType, jilla, religion, ageFrom, ageTo } = removeProperties(data)

  try {
    const data = prisma.user.findMany({
      where: {
        status: 'ACCEPTED',
        bloodType,
        jilla,
        religion,
        userType: 'DONOR',
        age: {
          gte: Number(ageFrom ?? 18),
          lte: Number(ageTo ?? 50)
        }
      }
    })
    return data
  } catch (error) {
    throw new Error('Something went wrong')
  }
}
