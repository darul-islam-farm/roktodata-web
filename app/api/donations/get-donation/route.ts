import { auth } from '@/configs/auth'
import excludeFields from '@/helper/excludeFields'
import { notFound, unAuth } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  const isAuth = await auth()
  if (!isAuth) return unAuth()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('donationId')!

  try {
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor: {
          include: {
            user: {
              select: {
                name: true,
                jilla: true,
                subJilla: true
              }
            }
          }
        },
        receiver: {
          include: {
            user: {
              select: {
                name: true,
                jilla: true,
                subJilla: true
              }
            }
          }
        }
      }
    })
    const data = excludeFields(donation, ['image', 'address'])
    return Response.json({ donation: data }, { status: 200 })
  } catch (error) {
    return notFound(error)
  }
}
