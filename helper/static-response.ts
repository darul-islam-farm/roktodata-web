export const unAuth = () =>
  Response.json({ message: 'UnAuthenticated' }, { status: 401 })

export const notFound = (error: any) =>
  Response.json({ error }, { status: 404 })

export const success_res = { ok: true, error: null }
export const error_res = (errorMsg?: string) => ({
  error: errorMsg ?? 'Something went wrong',
  ok: false
})
