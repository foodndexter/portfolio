import { Dextag, Input } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { AuthApi } from "./api/auth/auth.type"
import { useRouter } from "next/router"
import bcrypt from "bcryptjs"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)

  const focusOnEmail = useCallback(() => {
    emailRef.current?.focus()
  }, [])
  const focusOnPassword = useCallback(() => {
    passwordRef.current?.focus()
  }, [])
  const focusOnName = useCallback(() => {
    nameRef.current?.focus()
  }, [])

  useEffect(() => {
    focusOnEmail()
  }, [])

  const signup = useMutation({
    mutationFn: async (props: { email: string; password: string }): Promise<AuthApi> => {
      const { data } = await axios.post("auth/user", { props })
      return data
    },
    onSuccess: (res) => {
      console.log(res)
      const { success, message, payload } = res
      if (success && payload) {
        const { accessToken, user } = payload
        localStorage.setItem("accessToken", accessToken)
        console.log(user)
      }
    },
  })

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, password)
    return signup.mutate({ email, password })
    console.log(await bcrypt.hash(password, 12).then((password) => password))
  }, [])

  const router = useRouter()
  const onRegister = useCallback(() => {
    router.push({ pathname: "/signup" })
  }, [router])
  return (
    <View css={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <View as="form" onSubmit={onSubmit}>
        <Dextag fontSize={30} style={{ marginBottom: 30, textAlign: "center" }} />
        <View css={{ rowGap: 10 }}>
          <Input
            props={{
              value: email,
              id: "email",
              ref: emailRef,
            }}
            title="이메일"
            placeHolder="example@example.com"
            setValue={setEmail}
          />
          <Input
            props={{
              type: "password",
              value: password,
              id: "password",
              ref: passwordRef,
            }}
            title="비밀번호"
            placeHolder="6~18자리"
            setValue={setPassword}
          />
          <Button colors="BLUE" type="submit" css={{ margin: "10px 0" }}>
            회원가입
          </Button>
        </View>
      </View>
    </View>
  )
}
