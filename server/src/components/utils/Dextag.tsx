import { Typo } from "@/modules"
import React, { CSSProperties } from "react"

interface Props {
  fontSize?: number
  style?: CSSProperties
  textAlign?: "left" | "center" | "right"
}
export default function Dextag({ fontSize = 40, style, textAlign }: Props) {
  return (
    <Typo weight={"HEAVY"} css={{ fontSize, ...style }} textAlign={textAlign}>
      Dextag
    </Typo>
  )
}
