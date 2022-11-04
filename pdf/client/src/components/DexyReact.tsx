import React, { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { serialize } from "v8"
import { useAppSelector } from "../redux/hooks"
import { dexyStyle } from "../styles"

type CSS = React.CSSProperties
type Child = ReactNode
type Props = { children: Child; style?: CSS }
export const DexyView = (props: Props & { id?: string }) => {
  const { style, children, id } = props

  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily }

  const [viewStyle, setViewStyle] = useState<CSS>(initialStyle)

  useEffect(() => {
    style ? setViewStyle({ ...initialStyle, ...style }) : setViewStyle(initialStyle)
  }, [style])

  return (
    <div style={viewStyle} id={id}>
      {children}
    </div>
  )
}

export const DexyButton = (props: Props & { onClick: Function }) => {
  const { children, onClick, style } = props
  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily }
  const [btnStyle, setBtnStyle] = useState<CSS>(initialStyle)

  useEffect(() => {
    style ? setBtnStyle({ ...initialStyle, ...style }) : setBtnStyle(initialStyle)
  }, [style])
  return (
    <button onClick={(e) => onClick(e)} style={btnStyle}>
      {children}
    </button>
  )
}

export const DexyLink = (props: Props & { to: string; onClick: Function }) => {
  const { to, children, onClick, style } = props

  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily }
  const [btnStyle, setBtnStyle] = useState<CSS>(initialStyle)

  useEffect(() => {
    style ? setBtnStyle({ ...initialStyle, ...style }) : setBtnStyle(initialStyle)
  }, [style])
  return (
    <Link to={to} onClick={() => onClick}>
      {children}
    </Link>
  )
}

export const DexyAppView = (props: Props & { id?: string }) => {
  const { style, children, id } = props

  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily, ...dexyStyle.appCenter }

  const [viewStyle, setViewStyle] = useState<CSS>(initialStyle)

  useEffect(() => {
    style ? setViewStyle({ ...initialStyle, ...style }) : setViewStyle(initialStyle)
  }, [style])

  return (
    <div style={viewStyle} id={id}>
      {children}
    </div>
  )
}

export const DexyIcon = (props: { onClick: Function; style?: CSS; name: string; src: string; size?: number }) => {
  const { style, onClick, name, src } = props
  const [size, setSize] = useState<number>(0)
  useEffect(() => {
    props.size ? setSize(props.size) : setSize(60)
  }, [props.size])
  const [btnStyle, setBtnStyle] = useState<CSS>(dexyStyle.appIcon)

  useEffect(() => {
    style ? setBtnStyle({ ...dexyStyle.appIcon, ...style }) : setBtnStyle(dexyStyle.appIcon)
  }, [style])
  return (
    <button style={btnStyle} onClick={() => onClick()}>
      <div style={{ ...dexyStyle.appIconWrap, width: size, height: size }}>
        <img src={src} alt={name} />
      </div>
      <span style={dexyStyle.appIconName}>{name}</span>
    </button>
  )
}
