export interface User {
  email: string
  name: string
  uid: string
  profileImage?: string
  password?: string
}

export interface AuthProps {
  user: User | null
  initialized: boolean
}
