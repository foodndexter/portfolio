import { Dextag, Input, InputMessage } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useAlert, useAuth } from "@/context"
import { emailCheck, nameCheck, passwordCheck } from "@/customValidator"

export default function Signup() {
  const [email, setEmail] = useState("dexteryoon@icloud.com")
  const [password, setPassword] = useState("123123")
  const [name, setName] = useState("Random Kim")

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
    emailCheck(email)
  }, [email])

  useEffect(() => {
    focusOnEmail()
  }, [])

  const { alert } = useAlert()

  const { signUp } = useAuth()

  const router = useRouter()

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (emailCheck(email)) {
        return alert(emailCheck(email), "이메일", [{ name: "확인", onPress: focusOnEmail }])
      }
      if (passwordCheck(password, 6, 18)) {
        return alert(passwordCheck(password, 6, 18), "비밀번호", [{ name: "확인", onPress: focusOnPassword }])
      }
      if (nameCheck(name)) {
        return alert(nameCheck(name), "이름", [{ name: "확인", onPress: focusOnName }])
      }

      signUp({ email, password, name })
    },
    [signUp, nameCheck, name, emailCheck, email, passwordCheck, password]
  )

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
          <InputMessage message={emailCheck(email)} />
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
          <InputMessage message={passwordCheck(password, 6, 18)} />
          <Input
            props={{
              value: name,
              id: "name",
              ref: nameRef,
            }}
            title="이름"
            placeHolder="이름을 입력하세요."
            setValue={setName}
          />
          <InputMessage message={nameCheck(name)} />
          <Button colors="BLUE" type="submit" css={{ margin: "10px 0" }}>
            회원가입
          </Button>
        </View>
      </View>
    </View>
  )
}
