import { IndexWithFriends, IndexWithoutFriends } from "@/components/home"
import { User, useAuth } from "@/context"
import React from "react"
import { useQuery } from "react-query"

export default function Home() {
  const { user } = useAuth()
  if (user === null) {
    return null
  }
  const { friendsList } = user

  return friendsList && friendsList.length > 0 ? <IndexWithFriends /> : <IndexWithoutFriends />
}
