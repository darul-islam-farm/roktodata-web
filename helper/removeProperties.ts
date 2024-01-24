const removeProperties = <T extends Record<string, unknown>>(obj: T): T => {
  Object.keys(obj).forEach((key) => obj[key] === 'all' && delete obj[key])
  return obj
}
export default removeProperties
