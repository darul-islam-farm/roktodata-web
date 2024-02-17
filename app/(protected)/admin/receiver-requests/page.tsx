import { getReceiverData } from '@/actions/admin'

import RequestTable from '@/components/dashboard/RequestTable'

export default async function ReceiverRequests() {
  const data = await getReceiverData('PENDING')

  return (
    <div>
      <RequestTable
        data={data.data}
        userType='RECEIVER'
        title='সকল গ্রহীতা রিকুয়েস্ট'
      />
    </div>
  )
}
