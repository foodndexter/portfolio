import axios from "axios"
import { useRouter } from "next/router"
<<<<<<< Updated upstream
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { AuthProps, User } from "./types"
import axios from "axios"
=======
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useMutation } from "react-query"
import { AuthProps, SigninApi, User, API } from "./types"
>>>>>>> Stashed changes

const initialState: AuthProps = { user: null, initialized: false, isProcessing: false, signIn: async () => {}, signOut: () => {}, signUp: async () => {} }
const data = createContext(initialState)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  const init = useCallback(
    async (timing?: number) => {
      const fetchUser = async () => {
        const { data } = await axios.get("auth/user", { withCredentials: true })
        console.log(data)
      }

      await fetchUser()
      await setTimeout(
        () => {
          setInitialized(true)

          if (router.pathname !== "/signup") {
            router.push({ pathname: "signin" })
          }
        },
        timing ? timing : 2000
      )
    },
    [user]
  )

  const [isProcessing, setIsProcessing] = useState(false)

  const signinFn = useMutation({
    mutationFn: async (props: { email: string; password: string }): Promise<SigninApi> => {
      const { data } = await axios.post("auth/signin", { ...props })
      return data
    },
    onSuccess: (res) => {
      const { success, message, payload } = res
      console.log(res)
      if (!success) {
        throw new Error(message)
      }
      if (!payload) {
        throw new Error("Payload is undefined")
      }
      const { accessToken, user } = payload
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      localStorage.setItem("accessToken", accessToken)
      setUser(user)
    },
  })
  const signIn = useCallback(
    (props: { email: string; password: string }) => {
      signinFn.mutate(props)
    },
    [signinFn]
  )

  const signOut = useCallback(() => {
    useMutation({
      mutationFn: async (): Promise<API> => {
        const { data } = await axios.get("auth/signout", { withCredentials: true })
        return data
      },
      onSuccess: (res) => {
        const { success, message } = res
        if (!success) {
          throw new Error(message)
        }
        localStorage.setItem("accessToken", "")
        setUser(null)
      },
    }).mutate()
  }, [])

  const signupFn = useMutation({
    mutationFn: async (props: { email: string; password: string; name: string }): Promise<SigninApi> => {
      const { data } = await axios.post("auth/user", { ...props })
      return data
    },
    onSuccess: (res) => {
      const { success, message, payload } = res
      if (!success) {
        throw new Error(message)
      }
      if (!payload) {
        throw new Error("Payload is undefined")
      }
      const { accessToken, user } = payload
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      localStorage.setItem("accessToken", accessToken)
      setUser(user)
    },
  })

  const signUp = useCallback(
    (props: { email: string; password: string; name: string }) => {
      signupFn.mutate(props)
    },
    [signupFn]
  )

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:3000/api"
    init(1000)
  }, [init])

  return <data.Provider value={{ user, initialized, isProcessing, signIn, signOut, signUp }}>{children}</data.Provider>
}

export function useAuth() {
  return useContext(data)
}
