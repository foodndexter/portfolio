import React, { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../contextApi/StateProvider"
import { useAppSelector } from "../redux/hooks"
import { dexyStyle } from "../styles"

type CSS = React.CSSProperties
type Child = ReactNode
type Props = { children: Child; style?: CSS }
export const DexyView = (props: Props & { id?: string }) => {
  const { style, children, id } = props

  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = {
    color,
    backgroundColor,
    fontWeight,
    fontSize,
    fontFamily,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  }

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

export const DexyButton = (props: { onClick?: Function; title?: string; children?: Child; style?: CSS; type?: "submit" }) => {
  const { children, onClick, style, title, type } = props
  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily }
  const [btnStyle, setBtnStyle] = useState<CSS>(initialStyle)

  const initialSubmitStyle: CSS = { ...initialStyle, color: backgroundColor, backgroundColor: color, ...dexyStyle.submitBtn, borderColor: backgroundColor }
  const [submitStyle, setSubmitStyle] = useState<CSS>(initialSubmitStyle)

  useEffect(() => {
    style ? setBtnStyle({ ...initialStyle, ...style }) : setBtnStyle(initialStyle)
  }, [style])

  return (
    <button
      onClick={(e) => {
        onClick && onClick(e)
      }}
      style={type === "submit" ? submitStyle : btnStyle}>
      {children ? children : title}
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
    <Link to={to} onClick={() => onClick} style={btnStyle}>
      {children}
    </Link>
  )
}

export const DexyAppView = (props: Props & { id?: string }) => {
  const { style, children, id } = props

  const { screen } = useStateContext()

  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.sample)

  const initialStyle: CSS = { color, backgroundColor, fontWeight, fontSize, fontFamily, ...dexyStyle.appCenter }

  const [viewStyle, setViewStyle] = useState<CSS>(initialStyle)

  useEffect(() => {
    style ? setViewStyle({ ...initialStyle, width: screen.width, height: "calc(100% - 120px)", ...style }) : setViewStyle(initialStyle)
  }, [style])
  return (
    <div style={viewStyle} id={id}>
      {children}
    </div>
  )
}

export const DexyIcon = (props: { onClick?: Function; style?: CSS; name: string; src: string; size?: number; option?: any }) => {
  const { style, onClick, name, src, option } = props
  const [size, setSize] = useState<number>(0)
  useEffect(() => {
    props.size ? setSize(props.size) : setSize(60)
  }, [props.size])
  const [btnStyle, setBtnStyle] = useState<CSS>(dexyStyle.appIcon)

  useEffect(() => {
    style ? setBtnStyle({ ...dexyStyle.appIcon, ...style }) : setBtnStyle(dexyStyle.appIcon)
  }, [style])
  return (
    <button
      style={btnStyle}
      onClick={() => {
        onClick && onClick()
      }}>
      {option && <span style={dexyStyle.appIconOption}>{option}</span>}
      <div style={{ ...dexyStyle.appIconWrap, width: size, height: size }}>
        <img src={src} alt={name} />
      </div>
      <span style={dexyStyle.appIconName}>{name}</span>
    </button>
  )
}

export const ResponsiveBox169 = (props: { children?: Child; style?: CSS; width?: string | number }) => {
  const { children, style } = props
  const [screen, setScreen] = useState<{ width: number; height: number }>({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const getScreen = () => setScreen({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener("resize", getScreen)
    return () => window.removeEventListener("resize", getScreen)
  }, [screen])

  const initialStyle: CSS = { overflow: "hidden" }
  const [boxStyle, setBoxStyle] = useState(initialStyle)
  useEffect(() => {
    const propsWidth = Number(String(props.width).split("%")[0])
    if (style) {
      setBoxStyle(
        propsWidth
          ? { ...initialStyle, ...style, width: props.width, height: (((screen.width / 100) * propsWidth) / 16) * 9 }
          : { ...initialStyle, ...style, width: props.width, height: (screen.width / 16) * 9 }
      )
    } else
      setBoxStyle(
        propsWidth
          ? { ...initialStyle, width: props.width, height: (((screen.width / 100) * propsWidth) / 16) * 9 }
          : { ...initialStyle, width: props.width, height: (screen.width / 16) * 9 }
      )
  }, [style, screen, props.width])
  return <div style={boxStyle}>{children}</div>
}

type Styling = { inputWrap: CSS; label: CSS; input: CSS }

export const DexyInput = (props: {
  id?: any
  placeHolder?: string
  value: any
  onChange: (e: any) => void
  name?: any
  type?: "password"
  style?: Styling
}) => {
  const { id, placeHolder, value, onChange, name, type, style } = props

  const initialStyle: Styling = { inputWrap: dexyStyle.inputWrap, label: dexyStyle.label, input: dexyStyle.input }

  const [isFocused, setIsFocused] = useState(false)

  const onBlur = () => {
    if (value.length === 0) {
      setIsFocused(false)
    } else setIsFocused(true)
  }

  const [styling, setStyling] = useState<Styling>(initialStyle)

  useEffect(() => {
    onBlur()
    if (style) {
      if (isFocused) {
        setStyling({
          inputWrap: { ...initialStyle.inputWrap, ...style.inputWrap },
          label: { ...initialStyle.label, ...style.label, fontSize: 10, top: 10, transform: "none" },
          input: { ...initialStyle.input, ...style.input },
        })
      } else
        setStyling({
          inputWrap: { ...initialStyle.inputWrap, ...style.inputWrap },
          label: { ...initialStyle.label, ...style.label },
          input: { ...initialStyle.input, ...style.input },
        })
    } else {
      if (isFocused) {
        setStyling({ ...styling, label: { ...initialStyle.label, fontSize: 10, top: 10, transform: "none" } })
      } else setStyling(initialStyle)
    }
  }, [style, value, isFocused])

  return (
    <div style={styling.inputWrap}>
      {placeHolder && (
        <label htmlFor={id} style={styling.label}>
          {placeHolder}
        </label>
      )}
      <input
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        style={styling.input}
        onFocus={() => {
          if (value.length > 0) setIsFocused(true)
        }}
        onBlur={onBlur}
      />
    </div>
  )
}

export const DexyForm = (props: { style?: CSS; onSubmit?: () => void; children: Child }) => {
  const onSubmit = (e: any) => {
    e.preventDefault()
    props.onSubmit && props.onSubmit()
  }
  return <form onSubmit={onSubmit}>{props.children}</form>
}
