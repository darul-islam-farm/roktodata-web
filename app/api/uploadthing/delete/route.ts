import { UTApi } from 'uploadthing/server'

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  const utapi = new UTApi()

  try {
    const res = await utapi.deleteFiles(key!)
    return Response.json(
      { message: 'Successfully deleted', res },
      { status: 200 }
    )
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
