<<<<<<< Updated upstream
import { Colors, View } from "@/modules"
import React, { Dispatch, SetStateAction, useState, useCallback, useEffect } from "react"
=======
import { Colors, Typo, View } from "@/modules"
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
>>>>>>> Stashed changes

interface Props {
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  title?: string
  placeHolder?: string
  setValue?: Dispatch<SetStateAction<any>>
}
<<<<<<< Updated upstream
export default function Input({ props, title, placeHolder, setValue }: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const onFocus = () => setIsFocused(true)

  const onBlur = useCallback(
    (value?: any) => {
      setIsFocused(props?.value ? true : false)
=======
export function Input({ props, title, placeHolder, setValue }: Props) {
  const [focused, setFocused] = useState(false)
  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
    props?.onChange && props.onChange(e)
  }

  const onBlur = useCallback(
    (value?: any) => {
      if (value) {
        if (value.length > 0) {
          setFocused(true)
        }
      }
      if (props?.value) {
        setFocused(true)
      } else setFocused(false)
>>>>>>> Stashed changes
    },
    [props?.value]
  )

  useEffect(() => {
    onBlur(props?.value)
<<<<<<< Updated upstream
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
=======
  }, [onBlur, props?.value])

  return (
    <View css={{ height: 40, borderRadius: 5, border: `1px solid ${Colors.GRAY}`, overflow: "hidden", minWidth: 200 }} position="relative">
      {title && (
        <View as="label" htmlFor={props?.id} position={"absolute"} css={{ top: 3, left: 3, fontSize: 10, color: Colors.GRAY, transition: "all .2s ease-out" }}>
>>>>>>> Stashed changes
          {title}
        </View>
      )}
      {placeHolder && (
        <View
          as="label"
          htmlFor={props?.id}
          position={"absolute"}
          css={{
<<<<<<< Updated upstream
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
=======
            top: "calc(50% + 7px)",
            left: 0,
            color: Colors.GRAY,
            transform: "translateY(-50%)",
            textAlign: "center",
            width: "100%",
            transition: "all .2s ease-out",
          }}
          style={focused ? { opacity: 0 } : {}}>
>>>>>>> Stashed changes
          {placeHolder}
        </View>
      )}
      <input
<<<<<<< Updated upstream
        type="text"
        id={props?.id}
        {...props}
        style={{ flex: 1, padding: 5, border: "none", paddingTop: 15 }}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
=======
        onChange={onChange}
        onBlur={onBlur}
        type="text"
        onFocus={onFocus}
        id={props?.id}
        {...props}
        style={{ flex: 1, padding: 5, border: "none", paddingTop: 15 }}
>>>>>>> Stashed changes
      />
    </View>
  )
}

interface InputMessageProps {
  message: string | null
}
export function InputMessage({ message }: InputMessageProps) {
  return message != null ? (
    <Typo css={{ color: Colors.RED }} size="SMALL">
      {message}
    </Typo>
  ) : null
}
