import { auth } from '@/configs/auth'

export default async function GetAuth() {
  const session = await auth()
  console.log('user', session)
  return <div>GetAuth</div>
}
