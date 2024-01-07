export const unAuth = () =>
  Response.json({ message: 'UnAuthenticated' }, { status: 401 })
