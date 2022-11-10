import React, { ReactNode } from "react"
import { styled } from "@stitches/react"
import { useAttendencyContext } from "../../contextApi/AttendencyProvider"
import type * as stitchType from "@stitches/react"

const maxWidth = 1200
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
  borderColor?: string
  borderRadius?: number
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
    borderColor,
    borderRadius,
  } = props
  const { theme } = useAttendencyContext()

  const Button = styled("button", {
    backgroundColor: backgroundColor ? backgroundColor : border ? theme.backgroundColor : theme.color,
    color: color ? color : border ? theme.color : theme.backgroundColor,
    height: height ? height : 50,
    borderRadius: borderRadius ? borderRadius : 3,
    borderColor,
    width,
    border: `1px solid ${color ? color : theme.color}`,
    transition: "all .2s ease-out",
    fontWeight: fontWeight ? fontWeight : theme.fontWeight,
    fontSize: fontSize ? fontSize : theme.fontSize,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    overflow: "hidden",
    "&:hover": {
      opacity: 0.8,
    },
  })

  return <Button onClick={onClick}>{children}</Button>
}

export const DexyButtonWrap = (props: {
  children: ReactNode
  flexFlow?: string
  flexDirection?: "row" | "column"
  justifyContent?: string
  alignItems?: string
  marginBottom?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
  margin?: number | string
  width?: string | number
}) => {
  const { children, flexDirection, flexFlow, justifyContent, alignItems, margin, marginBottom, marginLeft, marginRight, marginTop, width } = props
  const ButtonWrap = styled("div", {
    display: "flex",
    width: width ? width : "100%",
    maxWidth,
    flexFlow,
    flexDirection,
    justifyContent,
    alignItems,
    margin,
    marginRight,
    marginLeft,
    marginTop,
  })

  return <ButtonWrap>{children}</ButtonWrap>
}

export const AContainer = (props: { children: ReactNode; position?: "relative" | "absolute" | "fixed"; textAlign?: string }) => {
  const { children, position, textAlign } = props
  const Container = styled("div", {
    width: "calc(100% - 20px)",
    maxWidth: 1200,
    margin: "0 auto",
    position,
    padding: 10,
    textAlign,
  })

  return <Container>{children}</Container>
}

export const AAppView = (props: { children: ReactNode }) => {
  const AppView = styled("div", {
    width: "100%",
    height: "calc(100vh - 160px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  })
  return <AppView>{props.children}</AppView>
}
