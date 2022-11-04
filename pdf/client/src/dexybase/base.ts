import { blackIcon, blueIcon, purpleIcon, redIcon } from "./icons"

export const dexyMenus: Menus[] = [
  { name: "EVAS", path: "evas", img: "" },
  { name: "학원 출결 관리", path: "attendency", img: "" },
  { name: "블로그", path: "blog", img: "" },
]

export const dexyRGB: RGB = {
  black: "67,67,67",
  white: "255, 255, 255",
  red: "255, 108, 108",
  orange: "255, 193, 108",
  yellow: "252, 247, 247",
  green: "163, 226, 155",
  blue: "108, 193, 255",
  navy: "40, 61, 177",
  purple: "201, 159, 250",
}

export const dexyBanner: Banner[] = [
  { name: "고등내신", path: "gdns", img: `rgb(${dexyRGB.black})`, icon: blackIcon },
  { name: "모의고사", path: "megs", img: `rgb(${dexyRGB.red})`, icon: redIcon },
  { name: "수능특강", path: "sntg", img: `rgb(${dexyRGB.blue})`, icon: blueIcon },
  { name: "필수문법", path: "psmb", img: `rgb(${dexyRGB.purple})`, icon: purpleIcon },
]

// export const gdns: CategoryList[] = [{ name: "eng" }]
