import { Colors, View } from "@/modules"
import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from "react"

interface Props {
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  title?: string
  placeHolder?: string
  setValue?: Dispatch<SetStateAction<any>>
}
export default function Input({ props, title, placeHolder, setValue }: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const onFocus = () => setIsFocused(true)

  const onBlur = useCallback(
    (value?: any) => {
      setIsFocused(props?.value ? true : false)
    },
    [props?.value]
  )

  useEffect(() => {
    onBlur(props?.value)
  }, [props?.value])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value)
    }
    if (props?.onChange) {
      props?.onChange(e)
    }
  }
  return (
    <View css={{ height: 40, borderRadius: 5, border: `1px solid ${Colors.GRAY}`, overflow: "hidden", minWidth: 200 }} position="relative">
      {title && (
        <View as="label" htmlFor={props?.id} position={"absolute"} css={{ top: 3, left: 3, fontSize: 10, color: Colors.GRAY }}>
          {title}
        </View>
      )}
      {placeHolder && (
        <View
          as="label"
          htmlFor={props?.id}
          position={"absolute"}
          css={{
            top: "calc(50% + 5px)",
            left: 0,
            color: Colors.GRAY,
            width: "100%",
            transform: "translateY(-50%)",
            textAlign: "center",
            transition: "all .2s ease-out",
          }}
          style={isFocused ? { opacity: 0 } : {}}
        >
          {placeHolder}
        </View>
      )}
      <input
        type="text"
        id={props?.id}
        {...props}
        style={{ flex: 1, padding: 5, border: "none", paddingTop: 15 }}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </View>
  )
}
