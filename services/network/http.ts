import instance from '@/lib/axiosinstance'

const responseBody = (response: any) => response.data

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  patch: (url: string, body: {}) =>
    instance.patch(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody)
}

export default requests
