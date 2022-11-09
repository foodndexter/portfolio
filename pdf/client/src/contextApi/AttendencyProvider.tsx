import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

const app = createContext<any | {theme:Theme}>({})

export const AttendencyProvider = (props: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>({ backgroundColor: "white", color: "black", fontSize: 20, fontWeight: 400 })
  const value: { theme: Theme } = { theme }

  return <app.Provider value={{ theme }}>{props.children}</app.Provider>
}

export const useAttendencyContext = () => useContext(app)
