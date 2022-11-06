import React from "react"
import { dexyRGB } from "./dexybase"
type CSS = React.CSSProperties
const top = 60

// const width = window.innerWidth
const height = window.innerHeight - top * 2
// let device: Device = "tablet"
// if (width < 768) {
//   device = "mobile"
// } else if (width >= 1200) {
//   device = "pc"
// }
let fontSize: number = 20
let fontWeight: number = 400
let fontFamily: string = ""
let color: string = "black"
let backgroundColor: string = "white"

export const header: Record<"layout" | "container" | "wrap" | "logo" | "menu", CSS> = {
  layout: {
    paddingTop: top,
  },
  container: {
    position: "fixed",
    zIndex: 99999,
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,.1)",
    top: 0,
    backgroundColor: "white",
  },
  wrap: {
    height: top,
    maxWidth: 1200,
    margin: "0 auto",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 25,
    fontWeight: 900,
  },
  menu: {
    position: "absolute",
    top: "50%",
    left: 20,
    transform: "translateY(-50%)",
  },
}

export const sidebar: Record<"container" | "wrap" | "menuItem", CSS> = {
  container: {
    position: "fixed",
    top,
    left: 0,
    width: "100%",
    height: `calc(100vh - ${top}px)`,
    transition: "all .2s ease-out",
    visibility: "hidden",
    opacity: 0,
    zIndex: 999,
  },
  wrap: { display: "flex", flexDirection: "column", height: "100%" },
  menuItem: {
    fontSize,
    fontWeight,
    fontFamily,
    color,
    background: `rgba(${dexyRGB.navy},.1)`,
    padding: 20,
  },
}

export const dexyStyle: Record<
  "appCenter" | "appButton" | "appIcon" | "appIconWrap" | "appIconName" | "btnWrap" | "bold" | "oneLine" | "inputWrap" | "label" | "input" | "submitBtn",
  CSS
> = {
  appCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height,
  },
  appButton: {
    backgroundColor: `rgba(${dexyRGB.navy},1)`,
    color: "white",
    padding: 20,
    borderRadius: 3,
    height: 50,
    marginBottom: 10,
    fontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    maxWidth: 300,
    boxShadow: `0 3px 6px rgba(${dexyRGB}, 1)`,
  },
  appIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  appIconWrap: {
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid",
  },
  appIconName: {
    fontSize,
    marginTop: 10,
  },
  btnWrap: {
    display: "flex",
    justifyContent: "center",
  },
  bold: {
    fontWeight: 900,
  },
  oneLine: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    width: "100%",
    marginBottom: 10,
    flexDirection: "column",
    height: 50,
  },
  label: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: 10,
  },
  input: {
    border: "1px solid",
    height: "100%",
    borderRadius: 3,
    padding: "10px 10px 0",
    fontSize: 20,
  },
  submitBtn: {
    width: "100%",
    height: 50,
    fontSize: 20,
    border: "1px solid",
    borderRadius: 3,
  },
}

export const banner: Record<"container" | "btns" | "prevBtn" | "nextBtn" | "ctrlWrap" | "playBtn" | "indicators" | "indicator" | "inner", CSS> = {
  container: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  ctrlWrap: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 1200,
    left: "50%",
    height: 0,
  },
  btns: {
    position: "absolute",
  },
  prevBtn: {
    bottom: 0,
    transform: "translateY(50%)",
    left: 20,
  },
  nextBtn: {
    bottom: 0,
    transform: "translateY(50%)",
    right: 20,
  },
  playBtn: {
    bottom: 20,
    right: 20,
  },
  indicators: {
    position: "absolute",
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    left: "50%",
    transform: "translateX(-50%)",
  },
  indicator: {
    position: "relative",
    padding: "10px 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  inner: {
    display: "block",
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: `rgb(${dexyRGB.white})`,
    opacity: 0.5,
    transition: "all .2s ease-out",
  },
}

export const lectureBox: Record<"btnWrap" | "btns", CSS> = {
  btnWrap: {
    height: 50,
  },
  btns: {
    width: "100%",
    border: "1px solid",
    fontSize: 16,
  },
}

export const lectureItem: Record<"container" | "imgWrap" | "titleInImg" | "info" | "screen" | "icon" | "show", CSS> = {
  show: { display: "flex", flexFlow: "row wrap" },
  container: {
    cursor: "pointer",
    position: "relative",
  },
  imgWrap: {
    position: "relative",
    overflow: "hidden",
  },
  titleInImg: {
    width: "calc(100% - 40px)",
    position: "absolute",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.2)",
  },
  info: {
    margin: "10px 0 20px",
    paddingLeft: 10,
  },
  icon: {
    border: "1px solid",
    borderRadius: 100,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 10,
  },
}

export const popup: Record<"container" | "body" | "bg", CSS> = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: `calc(100vh - ${top}px)`,
    maxHeight: 0,
    zIndex: 3,
    visibility: "hidden",
    opacity: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    position: "relative",
    padding: 10,
    backgroundColor: "white",
    zIndex: 1,
    top: -60,
    width: 260,
    borderRadius: 10,
    border: "1px solid",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    backdropFilter: "blur(2px)",
    width: "100%",
    height: "100%",
  },
}

export const alertStyle: Record<"container" | "message" | "button", CSS> = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  message: {
    marginBottom: 10,
  },
  button: {
    color: backgroundColor,
    backgroundColor: color,
    height: 50,
    border: `1pxs solid ${color}`,
    width: "100%",
    borderRadius: 3,
    fontSize,
  },
}

export const confirmStyle: Record<"btns" | "okBtn" | "cancleBtn", CSS> = {
  btns: {},
  cancleBtn: { color, backgroundColor, border: "1px solid" },
  okBtn: { marginRight: 10 },
}

export const cartStyle: Record<"cartItem" | "cartItemWrap" | "checkArea" | "middleArea" | "basket", CSS> = {
  cartItem: {
    display: "flex",
    border: "1px solid",
    width: "calc(100% - 20px)",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cartItemWrap: {
    flexDirection: "column",
  },
  checkArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 60,
  },
  middleArea: {
    width: "calc(100% - 140px)",
    margin: "0 10px",
  },
  basket: {
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid",
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}
