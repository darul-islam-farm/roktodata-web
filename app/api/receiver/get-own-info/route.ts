import { auth } from '@/configs/auth'
import excludeFields from '@/helper/excludeFields'
import { notFound, unAuth } from '@/helper/static-response'

import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const isAuth = await auth()
  if (!isAuth) return unAuth()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') as string
  try {
    const response = await prisma.receiverProfile.findUnique({
      where: { id },
      include: {
        receiveHistory: true,
        appointment: true
      }
    })
    const data = excludeFields(response, ['status'])
    return Response.json({ user: data }, { status: 200 })
  } catch (error) {
    return notFound(error)
  }
}
