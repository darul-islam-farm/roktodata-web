'use server'

import { TSearchdata } from '@/constants/schema/others'
import removeProperties from '@/helper/removeProperties'
import { error_res, success_res } from '@/helper/static-response'
import { UTApi } from 'uploadthing/server'

import prisma from '@/lib/prisma'

const utapi = new UTApi()

export const getSearchedDonor = async (data: TSearchdata) => {
  const { bloodType, jilla, religion, ageFrom, ageTo } = removeProperties(data)

  /** @TODO return Donor profile here instead of User  */

  try {
    const data = prisma.user.findMany({
      where: {
        status: 'ACCEPTED',
        bloodType,
        jilla,
        religion,
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

export const uploadFiles = async (formData: FormData) => {
  const files = formData.getAll('files')
  try {
    const response = await utapi.uploadFiles(files)
    return { ok: true, data: response.map((item) => item.data?.key) }
  } catch (error) {
    console.log('error on uploading ', error)
  }
}

export const submitApp = async (data: any) => {
  try {
    await prisma.appointment.create({ data })
    return success_res
  } catch (error) {
    console.log('error', error)
    return error_res('something went wrong')
  }
}
