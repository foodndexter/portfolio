import { Dextag, Input } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { AuthApi } from "./api/auth/auth.type"
import { useRouter } from "next/router"
import { useAlert, useAuth } from "@/context"
import { emailCheck, passwordCheck } from "@/customValidator"

export default function Signin() {
  const [email, setEmail] = useState("yoon.tec.info@gmail.com")
  const [password, setPassword] = useState("123123")

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const focusOnEmail = useCallback(() => {
    emailRef.current?.focus()
  }, [])
  const focusOnPassword = useCallback(() => {
    passwordRef.current?.focus()
  }, [])

  const { signIn, user } = useAuth()
  const { alert } = useAlert()

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (emailCheck(email)) {
        return alert(emailCheck(email), null, [{ onPress: focusOnEmail }])
      }

      if (passwordCheck(password, 6, 18)) {
        return alert(passwordCheck(password, 6, 18), null, [{ onPress: focusOnPassword }])
      }

      signIn({ email, password })
    },
    [signIn]
  )

  const router = useRouter()
  const onRegister = useCallback(() => {
    router.push({ pathname: "/signup" })
  }, [router])

  const onReturn = useCallback(() => {
    router.push({ pathname: "/" })
  }, [router])
  if (user) {
    return <>{onReturn()}</>
  }
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
