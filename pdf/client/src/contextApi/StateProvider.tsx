import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

const app = createContext<any>({})

type Screen = { width: number; height: number }
export const StateProvider = (props: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const getScreen = () => setScreen({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", getScreen)

    return () => window.removeEventListener("resize", getScreen)
  }, [screen])
  const value: { screen: Screen } = { screen }

  return <app.Provider value={{ screen }}>{props.children}</app.Provider>
}

export const useStateContext = () => useContext(app)
