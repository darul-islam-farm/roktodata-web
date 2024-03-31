export default function convertBloodType(bloodType: string) {
  if (bloodType.includes('-')) return bloodType
  return `${bloodType.trim()}+`
}
