import { UTApi } from 'uploadthing/server'

export async function POST(req: Request) {
  const formdata = await req.formData()
  const files = formdata.getAll('files')
  const utapi = new UTApi()

  try {
    const res = await utapi.uploadFiles(files)
    return Response.json(
      { ok: true, data: res.map((item) => item.data?.key) },
      { status: 201 }
    )
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
