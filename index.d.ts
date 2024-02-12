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

type TUser = {
  address: string
  bloodType: string
  createdAt: Date
  email: string
  gender: TGender
  age: number
  religion: string
  id: string
  identity: string
  jilla: string
  name: string
  phone: string
  phone2: string
  status: string
  subJilla: string
  thana: string
  updatedAt: Date
  userType: TUserType
}

type TUserType = 'DONOR' | 'RECEIVER'
type TStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'
type TGender = 'MALE' | 'FEMALE' | 'OTHERS'
type TRole = 'ADMIN' | 'MODERATOR' | 'DONOR' | 'RECEIVER'
