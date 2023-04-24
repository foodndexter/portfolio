import React from "react"
import { useQuery } from "react-query"
import { Processing } from "../layout"
import { View } from "@/modules"
import { RandomFriendsApi } from "@/pages/api/fetch/types"
import axios from "axios"
import FriendItem from "./FriendItem"

export default function IndexWithoutFriends() {
  const { isLoading, data, isSuccess, isError } = useQuery({
    queryKey: "users",
    queryFn: async (): Promise<RandomFriendsApi> => {
      const { data } = await axios.get("fetch/randomFriends")
      return data
    },
  })

  let content
  if (isLoading) {
    content = <Processing state={isLoading} />
  } else if (isError) {
    content = <>Error</>
  } else if (isSuccess) {
    content = (
      <View>
        <View>Meet Random Friends</View>
        <View>
          {data?.payload?.friends.map((friend) => (
            <FriendItem key={friend.uid} {...friend} />
          ))}
        </View>
      </View>
    )
  }
  return <>{content}</>
}
