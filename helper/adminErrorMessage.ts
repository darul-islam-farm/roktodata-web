export default function adminErrorMessage(error: any, isAuth: boolean) {
  console.log('errorrrrrrrr', error)
  if (!isAuth) return new Error('UnAuthenticated!')
  if (error?.name?.startsWith('PrismaClientValidationError'))
    return new Error('no data found!')
  return new Error('Something went wrong!')
}
