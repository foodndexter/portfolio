import React from "react"
import { dexyRGB } from "./dexybase"
type CSS = React.CSSProperties
const top = 60

const width = window.innerWidth
const height = window.innerHeight - top * 2
let device: Device = "tablet"
if (width < 768) {
  device = "mobile"
} else if (width >= 1200) {
  device = "pc"
}
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

export const dexyStyle: Record<"appCenter" | "appButton" | "appIcon" | "bannerSample" | "appIconWrap" | "appIconName" | "btnWrap" | "sampleImg", CSS> = {
  appCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width,
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
    width: width / 2,
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
  bannerSample: {
    width,
    height: (width / 16) * 9,
  },
  btnWrap: {
    display: "flex",
    justifyContent: "center",
  },
  sampleImg: {
    width,
    height: (width / 16) * 9,
  },
}

export const banner: Record<"container" | "btns" | "prevBtn" | "nextBtn" | "ctrlWrap" | "playBtn" | "indicators" | "indicator" | "inner", CSS> = {
  container: {
    position: "relative",
    overflow: "hidden",
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
