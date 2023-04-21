import { useRouter } from "next/router"
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { AuthProps, User } from "./types"

const initialState: AuthProps = { user: null, initialized: false }
const data = createContext(initialState)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  const init = useCallback(
    async (timing?: number) => {
      await setTimeout(
        () => {
          setInitialized(true)
          router.push({ pathname: "signin" })
        },
        timing ? timing : 2000
      )
    },
    [user]
  )

  useEffect(() => {
    init(1000)
  }, [init])

  return <data.Provider value={{ user, initialized }}>{children}</data.Provider>
}

export function useAuth() {
  return useContext(data)
}
