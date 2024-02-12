interface IChildren {
  children: React.ReactNode
}
type TUserSession =
  | {
      id: string
      name: string
      email: string
      role: TRole
      bloodType: string
      status: string
    }
  | undefined

type TUser = {
  id: string
  name: string
  identity: string
  email: string
  address: string
  gender: TGender
  age: number
  religion: string
  jilla: string
  subJilla: string
  thana: string
  phone: string
  phone2: string
  status: string
  bloodType: string
  createdAt: Date
  updatedAt: Date
}

type TUserType = 'DONOR' | 'RECEIVER'
type TStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'
type TGender = 'MALE' | 'FEMALE' | 'OTHER'
type TRole = 'ADMIN' | 'MODERATOR' | 'DONOR' | 'RECEIVER'
