import { error_res } from '@/helper/static-response'

type TSingleData = {
  to: string
  message: string
}
export const sendSingleSMS = async (data: TSingleData) => {
  try {
    const send = await fetch('http://bulksmsbd.net/api/smsapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: process.env.SMS_API_KEY,
        senderid: process.env.SMS_SENDER_ID,
        number: data.to,
        message: data.message
      })
    })
    const result = await send.json()
    return result.response_code === 202
  } catch (error) {
    console.log('error on sending sms', error)
    return error_res(error as string)
  }
}
export const sendMultipleSMS = async (data: TSingleData[]) => {
  const body = {
    api_key: process.env.SMS_API_KEY,
    senderid: process.env.SMS_SENDER_ID,
    messages: data
  }
  try {
    const send = await fetch('http://bulksmsbd.net/api/smsapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const result = await send.json()
    return result
  } catch (error) {
    console.log('error on sending sms', error)
    return error_res(error as string)
  }
}
