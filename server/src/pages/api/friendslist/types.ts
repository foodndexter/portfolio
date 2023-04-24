import { API, User } from "@/context"

export interface FriendsListApi extends API {
  payload?: GET | any
}

interface GET {
  friendslist: User[]
}
