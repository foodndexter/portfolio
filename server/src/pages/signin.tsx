<<<<<<< Updated upstream
import { Dextag, Input } from "@/components"
import { Button, Colors, Typo, View } from "@/modules"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { AuthApi } from "./api/auth/auth.type"
import { useRouter } from "next/router"
=======
import { Dextag, Input, InputMessage } from "@/components"
import { useAlert, useAuth } from "@/context"
import { emailCheck, passwordCheck } from "@/customValidator"
import { useInputCheck } from "@/hooks"
import { Button, Colors, View } from "@/modules"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
>>>>>>> Stashed changes

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
<<<<<<< Updated upstream

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
=======
  // const [name, setName] = useState("")

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  // const nameRef = useRef<HTMLInputElement | null>(null)

  const focusOnEmail = () => emailRef.current?.focus()
  const focusOnPassword = () => passwordRef.current?.focus()
  // const focusOnName = () => nameRef.current?.focus()

  useEffect(() => {
    focusOnEmail()
  }, [])
  const { alert } = useAlert()
  const { signIn } = useAuth()
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (emailCheck(email)) {
        return alert(emailCheck(email), "이메일", [{ name: "확인", onPress: focusOnEmail }])
      }
      if (passwordCheck(password, 6, 18)) {
        return alert(passwordCheck(password, 6, 18), "비밀번호", [{ name: "확인", onPress: focusOnPassword }])
      }
      // if (!name) {
      //   return alert("이름을 입력해 주세요.")
      // }
      console.log("hello")
      try {
        const res = await signIn({ email, password })
        console.log(res)
      } catch (error: any) {
        console.log(error.message)
      }
    },
    [email, password, name, emailCheck, passwordCheck]
  )

  const router = useRouter()
  const onRegister = useCallback(() => {
    router.push({
      pathname: "/signup",
    })
  }, [router])
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
          {/* <Input
            title="이름"
            placeHolder="Enter Your Name"
            props={{
              id: "Name",
              value: name,
              type: "name",
              ref: nameRef,
            }}
            setValue={setName}
          /> */}
        </View>
        <Button colors="BLUE" type="submit">
          로그인
        </Button>
        <View position={"relative"} css={{ width: "100%", alignItems: "center", margin: "20px 0" }}>
          <View position={"relative"} css={{ backgroundColor: Colors.WHITE, padding: 5, width: 30, fontSize: 12, alignItems: "center" }}>
            또는
          </View>
          <View
            position={"absolute"}
            css={{ width: "100%", height: 1, backgroundColor: Colors.LIGHTGRAY, top: "50%", left: 0, transform: "translateY(-50%)" }}
          />
>>>>>>> Stashed changes
        </View>
        <Button colors="BLACK" type="button" onClick={onRegister}>
          회원가입
        </Button>
      </View>
    </View>
  )
}
