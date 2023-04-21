import { Dextag, Input } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { AuthApi } from "./api/auth/auth.type"
import { useRouter } from "next/router"

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const focusOnEmail = useCallback(() => {
    emailRef.current?.focus()
  }, [])
  const focusOnPassword = useCallback(() => {
    passwordRef.current?.focus()
  }, [])

  useEffect(() => {
    focusOnEmail()
  }, [])

  const signinFn = useMutation({
    mutationFn: async (props: { email: string; password: string }): Promise<AuthApi> => {
      const { data } = await axios.post("auth/signin", { props })
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

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signinFn.mutate({ email, password })
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
            로그인
          </Button>
          <View position={"relative"} css={{ width: "100%" }}>
            <View position={"relative"} css={{ alignItems: "center" }}>
              <Typo css={{ backgroundColor: Colors.WHITE, width: 30, color: Colors.GRAY }} size="SMALL" textAlign={"center"}>
                또는
              </Typo>
            </View>
            <View
              position={"absolute"}
              css={{ width: "100%", height: 1, backgroundColor: Colors.LIGHTGRAY, top: "50%", left: 0, transform: "translateY(-50%)" }}
            />
          </View>
          <Button colors="BLACK" type="button" css={{ margin: "10px 0" }} onClick={onRegister}>
            회원가입
          </Button>
        </View>
      </View>
    </View>
  )
}
