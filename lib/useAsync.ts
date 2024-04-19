import useSWR from 'swr'

export default function useAsync(key: string, asyncFunction: any) {
  const { data, error, isLoading, mutate } = useSWR(key, asyncFunction)

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
