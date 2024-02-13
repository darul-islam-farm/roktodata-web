import { auth } from '@/configs/auth'
import { notFound, unAuth } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const isAuth = await auth()
  if (!isAuth) return unAuth()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') as string
  try {
    const response = await prisma.donorProfile.findUnique({
      where: { id },
      select: {
        bloodType: true,
        status: true,
        donationHistory: true,
        user: {
          select: {
            address: true,
            name: true,
            email: true,
            religion: true,
            phone: true,
            phone2: true,
            jilla: true,
            subJilla: true,
            thana: true,
            createdAt: true
          }
        }
      }
    })
    return Response.json({ donor: response }, { status: 200 })
  } catch (error) {
    return notFound(error)
  }
}
