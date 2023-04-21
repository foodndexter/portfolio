import { User } from "@/context"

export interface API {
  success: boolean
  message?: string
  payload?: any
}

export interface AuthApi extends API {
  payload?: {
    user: User
    accessToken: string
  }
}

export enum Collection {
  USERS = "users",
  TOKEN = "token",
}
