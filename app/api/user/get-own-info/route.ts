import { auth } from '@/configs/auth'
import excludeFields from '@/helper/excludeFields'
import { notFound, unAuth } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session) return unAuth()
  try {
    const response = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        donorProfile: {
          select: {
            status: true,
            donationHistory: {
              include: {
                receiver: {
                  select: {
                    name: true,
                    religion: true,
                    bloodType: true,
                    jilla: true,
                    subJilla: true,
                    thana: true,
                    address: true,
                    phone: true,
                    phone2: true
                  }
                }
              }
            }
          }
        }
      }
    })
    const data = excludeFields(response, ['status'])
    return Response.json({ user: data }, { status: 200 })
  } catch (error) {
    return notFound(error)
  }
}
