import { UTApi } from 'uploadthing/server'

export async function POST(req: Request) {
  const formdata = await req.formData()
  const file = formdata.get('file')
  const utapi = new UTApi()

  try {
    const res = await utapi.uploadFiles(file)
    return Response.json(
      { message: 'Successfully created', res },
      { status: 201 }
    )
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
