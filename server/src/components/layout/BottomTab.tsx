import React, { useEffect, useCallback, useState } from "react"
import { BottomTabProp } from "./types"
import { AiFillCompass, AiOutlineCompass, AiFillHome, AiOutlineHome, AiOutlinePlusSquare } from "react-icons/ai"
import { BsFillSendFill, BsSend } from "react-icons/bs"
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa"
import { FiInstagram } from "react-icons/fi"
import { MdNotificationsNone, MdNotifications } from "react-icons/md"
import { Button, Colors, View } from "@/modules"
import { useRouter } from "next/router"
import { useWindowDimension } from "@/hooks"

export default function BottomTab() {
  const [buttons, setButtons] = useState(initialButtons)
  const { width } = useWindowDimension()

  useEffect(() => {
    setButtons(width >= 500 ? mediumButtons : initialButtons)
  }, [width, mediumButtons, initialButtons])

  return (
    <View
      css={{
        position: "fixed",
        width: "100%",
        zIndex: 10,
        "@SMALL": {
          flexDirection: "row",
          bottom: 0,
          borderTop: `1px solid ${Colors.LIGHTGRAY}`,
          backgroundColor: "white",
          justifyContent: "space-between",
          position: "fixed",
        },
        "@MEDIUM": {
          left: 0,
          top: 0,
          borderRight: `1px solid ${Colors.LIGHTGRAY}`,
          width: 60,
          height: "100vh",
          backgroundColor: "white",
          position: "fixed",
          zIndex: 10,
        },
        backgroundColor: "whtie",
      }}
    >
      {buttons.map((button, index) => (
        <Item key={index} {...button} />
      ))}
    </View>
  )
}

function Item({ FocusedIcon, Icon, name, pathname }: BottomTabProp) {
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const { pathname } = router
    switch (name) {
      case "home":
        return setIsFocused(pathname === "/" ? true : false)

      case "feed":
        return setIsFocused(pathname === "/feed" ? true : false)

      case "send":
        return setIsFocused(pathname === "/send" ? true : false)

      case "userinfo":
        return setIsFocused(pathname === "/userinfo" ? true : false)

      case "notification":
        return setIsFocused(pathname === "notification" ? true : false)

      default:
        return setIsFocused(false)
    }
  }, [name, router])

  const onPressIcon = useCallback(() => {
    if (name === "plus") {
      alert("plus modal need to be built up")
    } else {
      if (pathname) {
        router.push({
          pathname,
        })
      } else console.log("no pathname")
    }
  }, [pathname, name])
  return (
    <Button
      onClick={onPressIcon}
      css={{
        border: "none",
        fontSize: 30,
        margin: 10,
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.05)",
        },
        padding: 5,
        height: 40,
      }}
    >
      {isFocused ? <FocusedIcon /> : <Icon />}
      <View
        css={{
          fontSize: 16,
          display: "none",
          "@LARGE": {
            display: "flex",
          },
        }}
      >
        {name}
      </View>
    </Button>
  )
}

const initialButtons: BottomTabProp[] = [
  { name: "home", pathname: "/", Icon: AiOutlineHome, FocusedIcon: AiFillHome },
  { name: "feed", pathname: "/feed", Icon: AiOutlineCompass, FocusedIcon: AiFillCompass },
  { name: "plus", Icon: AiOutlinePlusSquare, FocusedIcon: AiFillCompass },
  { name: "send", pathname: "/send", Icon: BsSend, FocusedIcon: BsFillSendFill },
  { name: "userinfo", pathname: "/userinfo", Icon: FaRegUserCircle, FocusedIcon: FaUserCircle },
]

const mediumButtons: BottomTabProp[] = [
  { name: "logo", pathname: "/", Icon: FiInstagram, FocusedIcon: FiInstagram },
  { name: "home", pathname: "/", Icon: AiOutlineHome, FocusedIcon: AiFillHome },
  { name: "notification", pathname: "/notification", Icon: MdNotificationsNone, FocusedIcon: MdNotifications },
  { name: "feed", pathname: "/feed", Icon: AiOutlineCompass, FocusedIcon: AiFillCompass },
  { name: "plus", Icon: AiOutlinePlusSquare, FocusedIcon: AiFillCompass },
  { name: "send", pathname: "/send", Icon: BsSend, FocusedIcon: BsFillSendFill },
  { name: "userinfo", pathname: "/userinfo", Icon: FaRegUserCircle, FocusedIcon: FaUserCircle },
]
