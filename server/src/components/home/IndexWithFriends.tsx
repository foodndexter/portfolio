import React from "react"
import { useQuery } from "react-query"
import { Processing } from "../layout"
import { View } from "@/modules"

export default function IndexWithFriends() {
  const { isLoading, data, isSuccess, isError } = useQuery({
    queryKey: "users",
  })

  let content
  if (isLoading) {
    content = <Processing state={true} />
  } else if (isError) {
    content = <>Error</>
  } else if (isSuccess) {
    content = <View>Meet Random Friends</View>
  }
  return <div>IndexWithFriends</div>
}
