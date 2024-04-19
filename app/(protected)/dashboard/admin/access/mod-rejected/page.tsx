import { getModsList } from '@/actions/admin'

import ModTable from '@/components/dashboard/ModTable'

export default async function ModRejected() {
  const { data } = await getModsList('REJECTED')
  return (
    <ModTable title='রিজেক্টেড মডারেটর লিস্ট' data={data} type='REJECTED' />
  )
}
