import { PropsWithChildren } from "react"
import BottomTab from "./BottomTab"
import { View } from "@/modules"
import { useWindowDimension } from "@/hooks"
import { Header } from "./headers"

export default function Layout({ children }: PropsWithChildren) {
  const { width } = useWindowDimension()
  return (
    <>
      <Header />
      <BottomTab />
      <View
        css={{
          "@SMALL": {
            padding: "60px 0",
          },
          "@MEDIUM": {
            backgroundColor: "coral",
            width: "calc(100% - 60px)",
            marginLeft: width >= 500 ? 60 : undefined,
            paddingTop: 60,
          },
        }}
      >
        {children}
      </View>
    </>
  )
}
