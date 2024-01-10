export default function adminErrorMessage(error: any) {
  if (error?.name?.startsWith('PrismaClientValidationError'))
    return new Error('no data found!')
  return new Error('Something went wrong!')
}
