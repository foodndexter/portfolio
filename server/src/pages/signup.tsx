<<<<<<< Updated upstream
import { Dextag, Input } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { AuthApi } from "./api/auth/auth.type"
import { useRouter } from "next/router"
import bcrypt from "bcryptjs"
=======
import { Dextag, Input, InputMessage } from "@/components"
import { useAlert } from "@/context"
import { emailCheck, passwordCheck } from "@/customValidator"
import { Button, View } from "@/modules"
import { useAuth } from "@/context"
import { useRouter } from "next/router"
import React, { useCallback, useRef, useState } from "react"
import { useMutation } from "react-query"
import axios from "axios"
>>>>>>> Stashed changes

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)

<<<<<<< Updated upstream
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
=======
  const focusOnEmail = () => emailRef.current?.focus()
  const focusOnPassword = () => passwordRef.current?.focus()
  const focusOnName = () => nameRef.current?.focus()

  const { alert } = useAlert()

  const { signUp } = useAuth()
  const fn = useMutation({
    mutationFn: async (): Promise<any> => {
      const { data } = await axios.get("hello")
>>>>>>> Stashed changes
      return data
    },
    onSuccess: (res) => {
      console.log(res)
<<<<<<< Updated upstream
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
=======
    },
  })

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (emailCheck(email)) {
        return alert(emailCheck(email), "이메일", [{ name: "확인", onPress: focusOnEmail }])
      }

      if (passwordCheck(password, 6, 18)) {
        return alert(passwordCheck(password, 6, 18), "비밀번호", [{ name: "확인", onPress: focusOnPassword }])
      }

      if (!name) {
        return alert("이름을 입력하세요", "이름", [{ name: "확인", onPress: focusOnName }])
      }
      signUp({ email, password, name })
    },
    [email, password, name, emailCheck, passwordCheck, signUp]
  )

  return (
    <View css={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <View as="form" onSubmit={onSubmit}>
        <Dextag fontSize={30} style={{ marginBottom: 30 }} textAlign="center" />
        <View css={{ rowGap: 10, marginBottom: 20 }}>
          <Input
            title="이메일"
            placeHolder="Enter Your Email"
            props={{
              id: "Email",
              value: email,
              ref: emailRef,
            }}
            setValue={setEmail}
          />
          {email && <InputMessage message={emailCheck(email)} />}
          <Input
            title="비밀번호"
            placeHolder="Enter Your Password"
            props={{
              id: "Password",
              value: password,
              type: "password",
              ref: passwordRef,
            }}
            setValue={setPassword}
          />
          {password && <InputMessage message={passwordCheck(password, 6, 18)} />}
          <Input
            title="이름"
            placeHolder="Enter Your Name"
            props={{
              id: "Name",
              value: name,
              type: "name",
              ref: nameRef,
            }}
            setValue={setName}
          />
        </View>
        <Button colors="BLUE" type="submit">
          회원가입
        </Button>
>>>>>>> Stashed changes
      </View>
    </View>
  )
}
