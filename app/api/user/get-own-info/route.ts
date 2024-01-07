import { auth } from '@/configs/auth'
import { unAuth } from '@/helper/error-response'

import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const isAuth = await auth()
  if (!isAuth) return unAuth()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') as string
  try {
    const response = await prisma.user.findUnique({ where: { id } })
    return Response.json({ user: response }, { status: 200 })
  } catch (error) {
    return Response.json({ error }, { status: 404 })
  }
}
