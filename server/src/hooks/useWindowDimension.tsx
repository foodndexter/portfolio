import React, { useState, useEffect } from "react"

export default function useWindowDimension() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getScreen = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }

      const getScroll = () => setScroll(window.scrollY)

      getScreen()
      window.addEventListener("resize", getScreen)
      window.addEventListener("scroll", getScroll)

      return () => {
        window.removeEventListener("resize", getScreen)
        window.removeEventListener("scroll", getScroll)
      }
    }
  }, [])
  return {
    width,
    height,
    scroll,
  }
}
