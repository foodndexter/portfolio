import React, { ReactNode } from "react"
import { styled } from "@stitches/react"
import { useAttendencyContext } from "../../contextApi/AttendencyProvider"

export const AButton = (props: {
  children: ReactNode
  onClick: (e: any) => void
  border?: boolean
  width?: number | string
  fontSize?: number
  fontWeight?: number
  backgroundColor?: string
  color?: string
  height?: number | string
  position?: string
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  marginBottom?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
  margin?: number | string
}) => {
  const {
    children,
    onClick,
    border,
    backgroundColor,
    color,
    fontSize,
    fontWeight,
    height,
    width,
    position,
    top,
    left,
    right,
    bottom,
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
  } = props
  const { theme } = useAttendencyContext()

  const Button = styled("button", {
    backgroundColor: backgroundColor ? backgroundColor : border ? theme.backgroundColor : theme.color,
    color: color ? color : border ? theme.color : theme.backgroundColor,
    height: height ? height : 50,
    borderRadius: 3,
    width,
    border: `1px solid ${color ? color : theme.color}`,
    transition: "all .2s ease-out",
    fontWeight: fontWeight ? fontWeight : theme.fontWeight,
    fontSize: fontSize ? fontSize : theme.fontSize,
    padding: 10,
    position,
    top,
    bottom,
    left,
    right,
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    "&:hover": {
      opacity: 0.8,
    },
  })

  return <Button onClick={onClick}>{children}</Button>
}
