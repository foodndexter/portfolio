import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

const app = createContext<any>({ screen: { width: 0, height: 0 } })

type Screen = { width: number; height: number }
type Device = "mobile" | "tablet" | "pc"
export const StateProvider = (props: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const getScreen = () => setScreen({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", getScreen)

    return () => window.removeEventListener("resize", getScreen)
  }, [screen])

  return <app.Provider value={{ screen }}>{props.children}</app.Provider>
}

export const useStateContext = () => useContext(app)
