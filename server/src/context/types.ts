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
  isProcessing: boolean
  signIn: (props: { email: string; password: string }) => void
  signUp: (props: { email: string; password: string; name: string }) => void
  signOut: () => void
}

export interface Alert {
  message: string | null
  title: string | null
  btns: AlertButton[]
  alert: AlertFn
  closeAlert: () => void
}

export interface AlertButton {
  name?: string
  onPress?: () => void
}

export type AlertFn = (message: null | string, title?: null | string, btns?: AlertButton[]) => void

export interface API {
  success: boolean
  message?: string
  payload?: any
}

export interface SigninApi extends API {
  payload?: { accessToken: string; user: User }
}
