export const unAuth = () =>
  Response.json({ message: 'UnAuthenticated' }, { status: 401 })

export const notFound = (error: any) =>
  Response.json({ error }, { status: 404 })

export const success_res = (data?: any) => ({
  ok: true,
  error: null,
  data: data ?? null
})
export const error_res = (errorMsg?: string) => ({
  error: errorMsg ?? 'Something went wrong',
  ok: false,
  data: null
})
