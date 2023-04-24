import { API, User } from "@/context"

export interface RandomFriendsApi extends API {
  payload: {
    friends: User[]
  }
}

export interface Friend {
  uid: string
  profileImage?: string
  name: string
  email: string
}
