import { User, useAuth } from "@/context"
import { Button, Colors, Typo, View } from "@/modules"
import React, { useState, useEffect, useCallback } from "react"

export default function FriendItem(props: User) {
  const { profileImage, email, name, uid } = props
  const [isAdded, setIsAdded] = useState(false)
  const { user, friendsListHandler } = useAuth()
  useEffect(() => {
    if (user && user.friendsList) {
      const check = user.friendsList.find((item) => item.uid === uid)
      setIsAdded(check ? true : false)
    } else setIsAdded(false)
  }, [user, email])

  const onFollow = useCallback(() => {
    if (user === null) {
      return
    }

    friendsListHandler(props)
  }, [props, friendsListHandler])
  return (
    <View direction={"row"} css={{ columnGap: 10, alignItems: "center", padding: 10, justifyContent: "space-between" }}>
      <View direction={"row"} css={{ columnGap: 10, alignItems: "center", width: "calc(100% - 80px)", overflow: "hidden", textOverflow: "ellipsis" }}>
        <View
          css={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.LIGHTGRAY,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {profileImage && <img alt={`${name} image`} src={profileImage} width={40} height={40} />}
        </View>
        <View css={{ justifyContent: "center", maxWidth: "calc(100% - 50px)", width: "100%", whiteSpace: "nowrap" }}>
          <Typo css={{ fontSize: 12 }} weight="BOLD">
            {email}
          </Typo>
          <Typo size={"SMALL"} css={{ flexDirection: "row", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>
            {name}
          </Typo>
        </View>
      </View>
      <Button css={{ width: 60, padding: 5, height: "auto" }} colors={isAdded ? "GRAY" : "BLUE"} onClick={onFollow}>
        {isAdded ? "팔로잉" : "팔로우"}
      </Button>
    </View>
  )
}
