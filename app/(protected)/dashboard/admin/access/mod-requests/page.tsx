import { getModsList } from '@/actions/admin'

import ModTable from '@/components/dashboard/ModTable'

export default async function ModRequests() {
  const { data } = await getModsList('PENDING')
  return <ModTable title='মডারেটর রিকুয়েস্ট' data={data} type='PENDING' />
}
