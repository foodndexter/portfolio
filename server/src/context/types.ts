export interface User {
  email: string
  name: string
  uid: string
  profileImage?: string
}

export interface AuthProps {
  user: User | null
  initialized: boolean
}
