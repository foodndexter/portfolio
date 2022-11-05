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

  const [screen, setScreen] = useState<{ width: number; height: number }>({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const getScreen = () => setScreen({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener("resize", getScreen)

    return () => window.removeEventListener("resize", getScreen)
  }, [screen.width])

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily, width: screen.width, ...dexyStyle.appCenter }

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

export const ResponsiveBox169 = (props: { children?: Child; style?: CSS }) => {
  const { children, style } = props
  const [screen, setScreen] = useState<{ width: number; height: number }>({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const getScreen = () => setScreen({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener("resize", getScreen)
    return () => window.removeEventListener("resize", getScreen)
  }, [screen.width])

  const initialStyle: CSS = { width: screen.width, height: (screen.width / 16) * 9 }
  const [boxStyle, setBoxStyle] = useState(initialStyle)
  useEffect(() => {
    const { width, height } = screen

    if (style) {
      setBoxStyle({ ...initialStyle, ...style })
    } else setBoxStyle(initialStyle)
  }, [style, screen])
  return <div style={boxStyle}>{children}</div>
}
