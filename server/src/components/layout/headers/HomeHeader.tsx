import { Input } from "@/components/utils"
import { Button, Colors, View } from "@/modules"
import { FiSearch } from "react-icons/fi"
import { MdNotificationsNone } from "react-icons/md"
import React, { useState, useCallback } from "react"
import { useRouter } from "next/router"

export default function HomeHeader() {
  const [keyword, setKeyword] = useState("")

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

  const router = useRouter()

  const onTitle = useCallback(() => {
    router.push({ pathname: "/" })
  }, [router])

  const onNotification = useCallback(() => {
    router.push({ pathname: "/notification" })
  }, [router])
  return (
    <View direction={"row"} css={{ columnGap: 10 }}>
      <Button style={{ border: "none", padding: 0, paddingLeft: 10, fontSize: 20, fontWeight: 900 }} onClick={onTitle}>
        Dextagram
      </Button>
      <View direction={"row"} css={{ columnGap: 5, borderRadius: 5, border: `1px solid ${Colors.LIGHTGRAY}`, backgroundColor: "rgba(0,0,0,.05)" }}>
        <Button type="button" css={{ padding: 5, height: "auto", border: "none", backgroundColor: "transparent" }}>
          <FiSearch />
        </Button>
        <View as="input" value={keyword} onChange={onChangeKeyword} css={{ border: "none", backgroundColor: "transparent", minWidth: 100, width: "100%" }} />
      </View>
      <Button css={{ fontSize: 30, height: "auto", marginRight: 10, padding: 0, border: "none" }} onClick={onNotification}>
        <View position={"relative"} css={{}}>
          <View
            css={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: Colors.RED,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
          <MdNotificationsNone />
        </View>
      </Button>
    </View>
  )
}
