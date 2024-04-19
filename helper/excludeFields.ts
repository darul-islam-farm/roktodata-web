export default function excludeFields(user: any, keys: string[]) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  )
}
