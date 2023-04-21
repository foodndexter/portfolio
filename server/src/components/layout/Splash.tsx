import { useAuth } from "@/context"
import { Colors, View } from "@/modules"
import React, { PropsWithChildren } from "react"
import { Dextag } from "../utils"

export default function Splash({ children }: PropsWithChildren) {
  const { initialized } = useAuth()
  return initialized ? (
    <>{children}</>
  ) : (
    <View
      position={"fixed"}
      css={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: Colors.WHITE, top: 0, left: 0 }}>
      <Dextag />
    </View>
  )
}
