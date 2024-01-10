import { getRequester } from '@/actions/admin'

import UserTable from '@/components/dashboard/UserTable'

export default async function ReceiverRequests() {
  const data = await getRequester('RECEIVER', 'PENDING')

  return (
    <div>
      <UserTable
        data={data}
        actionType='requests'
        userType='RECEIVER'
        title='সকল গ্রহীতা রিকুয়েস্ট'
      />
    </div>
  )
}
