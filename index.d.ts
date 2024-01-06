interface IChildren {
  children: React.ReactNode
}
type TUserSession =
  | {
      id: string
      name: string
      email: string
      bloodType: string
      userType: string
      status: string
    }
  | undefined
