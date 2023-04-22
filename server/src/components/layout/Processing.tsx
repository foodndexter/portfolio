import { useAuth } from "@/context"
import { Colors, View } from "@/modules"
import { keyframes } from "@stitches/react"
import { PropsWithChildren } from "react"

export default function Processing({ children }: PropsWithChildren) {
  const { isProcessing } = useAuth()

  return true ? <Spinner /> : <>{children}</>
}

function Spinner() {
  const size = 45

  const animation = keyframes({
    "0%": {
      transform: "skewX(0deg)",
      backgroundColor: "red",
      color: Colors.WHITE,
    },
    "20%": {
      backgroundColor: "coral",
      color: Colors.WHITE,
    },
    "40%": {
      backgroundColor: "yellow",
      color: Colors.BLACK,
    },
    "60%": {
      backgroundColor: "blue",
      color: Colors.WHITE,
    },
    "80%": {
      backgroundColor: "Navy",
      color: Colors.WHITE,
    },
    "100%": { transform: "skewX(360deg)", backgroundColor: "purple" },
  })

  const keyAnimation = keyframes({
    "0%": {
      color: Colors.WHITE,
      left: "50%",
    },
    "20%": {
      color: Colors.WHITE,
      left: "60%",
    },
    "40%": {
      color: Colors.BLACK,
      left: "55%",
    },
    "60%": {
      color: Colors.WHITE,
      left: "60%",
    },
    "80%": {
      color: Colors.WHITE,
      left: "40%",
    },
    "100%": {
      left: "45%",
    },
  })
  return (
    <View type="fullPage">
      <View css={{ width: 200, height: 200, margin: "auto", overflow: "hidden", position: "relative", boxShadow: "0 3px 6px rgba(0,0,0,.2)", borderRadius: 5 }}>
        <View
          position={"absolute"}
          css={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1, animation: `${keyAnimation} 1s infinite ease` }}
        >
          Loading...
        </View>
        <View css={{ width: "100%", height: "100%", position: "absolute", animation: `${animation} 1s infinite ease` }}></View>
      </View>
    </View>
  )
}
