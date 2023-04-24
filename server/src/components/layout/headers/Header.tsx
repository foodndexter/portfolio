import React, { Suspense } from "react"
import Processing from "../Processing"
import { useRouter } from "next/router"
import HomeHeader from "./HomeHeader"
import { Colors, View } from "@/modules"

export default function Header() {
  const { pathname } = useRouter()
  return (
    <Suspense fallback={<Processing state={true} />}>
      <View
        css={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          justifyContent: "center",
          height: 60,
          borderBottom: `1px solid ${Colors.LIGHTGRAY}`,
          backgroundColor: Colors.WHITE,
        }}
      >
        {pathname === "/" && <HomeHeader />}
      </View>
    </Suspense>
  )
}
