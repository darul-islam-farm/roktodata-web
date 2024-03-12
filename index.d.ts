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

type TDonor = {
  id: string
  bloodType: string
  status: TStatus
  userId?: string
  user: TUser
  donationHistory?: TDonation
  appointments?: TAppointment
}

type TDonation = {
  id: string
  donor: TDonor
  receiver: TUser
  donatedAt: Date
  image: string
  address: string
}

type TAppointment = {
  id: string
  donor: TDonor
  receiver: TUser
  scheduledAt: Date
  status: TAppointmentStatus
  images: string[]
  hospitalInfo: string
  address: string
  additionalInfo: string
}

type TUserType = 'DONOR' | 'RECEIVER'
type TStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'
type TUserStatus = 'NORMAL' | 'REQUESTED'
type TAppointmentStatus =
  | 'UNVERIFIED'
  | 'REJECTED'
  | 'PENDING'
  | 'ACCEPTED'
  | 'COMPLETED'
  | 'CANCELED'
type TGender = 'MALE' | 'FEMALE' | 'OTHER'
type TRole = 'ADMIN' | 'MODERATOR' | 'DONOR' | 'RECEIVER'
