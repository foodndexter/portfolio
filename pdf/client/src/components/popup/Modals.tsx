import React, { useEffect, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { DexyForm, DexyInput, DexyButton } from "../DexyReact"
import * as dexyDB from "../../functions"
import { useAppDispatch } from "../../redux/hooks"
import { userHandler } from "../../redux/reducers/userSlice"
import { alertHandler, modalHandler } from "../../redux/reducers/sampleSlice"
import { useNavigate } from "react-router-dom"

export const LoginModal = (props: { dispatch: AppDispatch; closeFn: () => void }) => {
  const [input, setInput] = useState<LoginInput>({ id: "testuser00700", password: "123123" })

  const onChange = (e: any) => setInput({ ...input, [e.target.name]: e.target.value })

  const dispatch = useAppDispatch()

  const [user, setUser] = useState<User>()

  const onSubmit = async () => {
    const user = await dexyDB.findById(input.id)
    if (user) {
      setUser(user)
    } else console.log("no user")
  }

  const navi = useNavigate()

  useEffect(() => {
    if (user) {
      const isPasswordCorrect = input.password === user.password
      if (isPasswordCorrect) {
        dispatch(userHandler(user))
        dispatch(modalHandler("off"))
        dispatch(alertHandler({ state: true, message: `Welcome ${user.id}!`, okBtn: "OK" }))
      } else {
        console.log("wrong password")
        setUser(undefined)
      }
    }
  }, [user])
  return (
    <DexyForm onSubmit={onSubmit}>
      <DexyInput value={input.id} name="id" placeHolder="Enter Your ID" onChange={onChange} id="userid" />
      <DexyInput value={input.password} name="password" placeHolder="Enter Your Password" onChange={onChange} id="password" type="password" />
      <DexyButton title="로그인" type="submit" />
    </DexyForm>
  )
}
