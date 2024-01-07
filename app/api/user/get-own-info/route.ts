import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') as string
  try {
    const response = await prisma.user.findUnique({ where: { id } })
    return Response.json({ user: response }, { status: 200 })
  } catch (error) {
    return Response.json({ error }, { status: 404 })
  }
}
