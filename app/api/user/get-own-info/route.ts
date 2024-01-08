import { auth } from '@/configs/auth'
import { notFound, unAuth } from '@/helper/error-response'
import excludeFields from '@/helper/excludeFields'

import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const isAuth = await auth()
  if (!isAuth) return unAuth()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') as string
  try {
    const response = await prisma.user.findUnique({
      where: { id }
    })
    const data = excludeFields(response, ['status'])
    return Response.json({ user: data }, { status: 200 })
  } catch (error) {
    return notFound(error)
  }
}
