import { Colors, View } from "@/modules"
import React, { Dispatch, SetStateAction } from "react"

interface Props {
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  title?: string
  placeHolder?: string
  id?: string
  setValue?: Dispatch<SetStateAction<any>>
}
export default function Input({ props, title, id, placeHolder, setValue }: Props) {
  return (
    <View css={{ height: 40, borderRadius: 5, border: `1px solid ${Colors.GRAY}`, overflow: "hidden" }} position="relative">
      {title && (
        <View as="label" htmlFor={id} position={"absolute"} css={{ top: 3, left: 3, fontSize: 10, color: Colors.GRAY }}>
          {title}
        </View>
      )}
      {placeHolder && (
        <View as="label" htmlFor={id} position={"absolute"} css={{ top: 3, left: 3, fontSize: 10, color: Colors.GRAY }}>
          {placeHolder}
        </View>
      )}
      <input type="text" id={id} {...props} style={{ flex: 1, padding: 5, border: "none" }} />
    </View>
  )
}
