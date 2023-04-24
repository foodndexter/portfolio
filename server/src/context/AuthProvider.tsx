import axios from "axios"
import { useRouter } from "next/router"
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { API, AuthProps, User } from "./types"
import { useMutation } from "react-query"
import { AuthApi } from "@/pages/api/auth/auth.type"
import { useAlert } from "./PopupProvider"

const initialState: AuthProps = {
  user: null,
  initialized: false,
  isProcessing: false,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  friendsListHandler: () => {},
}
const data = createContext(initialState)

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<null | string>(null)
  useEffect(() => {
    const getAccessToken = () => {
      if (typeof localStorage !== "undefined") {
        const value = localStorage.getItem("accessToken")
        setAccessToken(value)
        axios.defaults.headers.common.Authorization = `Bearer ${value}`
      } else return console.log("local Storage not mounted Yet")
    }

    return () => getAccessToken()
  }, [])

  const fecthUserFn = useMutation({
    mutationFn: async (): Promise<AuthApi> => {
      console.log("fetching data from server")
      const { data } = await axios.get("auth/user", { withCredentials: true })
      return data
    },
    onSuccess: (res) => {
      const { success, message, payload } = res
      if (!success) {
        alert(message!)
      }
      if (payload) {
        const { user } = payload
        setUser(user)
      }
    },
  })

  const fetchUser = useCallback(() => {
    console.log("fetching users...")
    fecthUserFn.mutate()
  }, [fecthUserFn])

  useEffect(() => {
    if (accessToken) {
      console.log("found accessToken", accessToken)
      fetchUser()
    }
  }, [accessToken])

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (user != null) {
      console.log(user)
    }
  }, [user])

  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  const init = useCallback(
    async (timing?: number) => {
      await setTimeout(
        () => {
          setInitialized(true)

          if (user === null || accessToken === null) {
            if (router.pathname !== "/" && !router.pathname.includes("sign")) {
              router.push({ pathname: "signin" })
            }
          }
        },
        timing ? timing : 2000
      )
    },
    [user, accessToken, router]
  )

  const [isProcessing, setIsProcessing] = useState(false)

  const { alert } = useAlert()

  const signinFn = useMutation({
    mutationFn: async (props: { email: string; password: string }): Promise<AuthApi> => {
      const { data } = await axios.post("auth/signin", { ...props })
      return data
    },

    onSuccess: (res) => {
      const { success, message, payload } = res
      console.log(res)
      if (!success) {
        return alert(message!)
      }
      if (!payload) {
        return alert("Payload is undefined")
      }
      const { accessToken, user } = payload
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      accessToken && localStorage.setItem("accessToken", accessToken)
      setUser(user)
      router.push({ pathname: "/" })
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
          return alert(message!)
        }
        localStorage.setItem("accessToken", "")
        setUser(null)
      },
    }).mutate()
  }, [])

  const signupFn = useMutation({
    mutationFn: async (props: { email: string; password: string; name: string }): Promise<AuthApi> => {
      const { data } = await axios.post("auth/user", props)
      return data
    },
    onSuccess: (res) => {
      const { success, message, payload } = res
      console.log(res)
      if (!success) {
        return alert(message!)
      }
      if (!payload) {
        return alert("Payload is undefined")
      }
      const { accessToken, user } = payload
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      accessToken && localStorage.setItem("accessToken", accessToken)
      setUser(user)
      router.push({ pathname: "/" })
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

  const friendsListFn = useMutation({
    mutationFn: async (props: User): Promise<any> => {
      setIsProcessing(true)
      const { data } = await axios.post("friendslist", props)
      return data
    },
    onSuccess: (res) => {
      setIsProcessing(false)
      console.log(res)
      const {} = res
    },
  })
  const friendsListHandler = useCallback(
    (props: User) => {
      friendsListFn.mutate(props)
    },
    [friendsListFn]
  )

  return <data.Provider value={{ user, initialized, isProcessing, signIn, signOut, signUp, friendsListHandler }}>{children}</data.Provider>
}

export function useAuth() {
  return useContext(data)
}
