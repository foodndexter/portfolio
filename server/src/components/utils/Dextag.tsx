import { Typo } from "@/modules"
import React, { CSSProperties } from "react"

interface Props {
  fontSize?: number
  style?: CSSProperties
}
export default function Dextag({ fontSize = 40, style }: Props) {
  return (
    <Typo weight={"HEAVY"} css={{ fontSize, ...style }}>
      Dextag
    </Typo>
  )
}
