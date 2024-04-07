import { getModsList } from '@/actions/admin'

import ModTable from '@/components/dashboard/ModTable'

export default async function ModList() {
  const { data } = await getModsList('ACCEPTED')
  return <ModTable title='মডারেটর লিস্ট' data={data} type='ACCEPTED' />
}
