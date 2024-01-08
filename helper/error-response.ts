export const unAuth = () =>
  Response.json({ message: 'UnAuthenticated' }, { status: 401 })

export const notFound = (error: any) =>
  Response.json({ error }, { status: 404 })
