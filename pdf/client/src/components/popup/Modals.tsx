import React, { useEffect, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { DexyForm, DexyInput, DexyButton } from "../DexyReact"
import * as dexyDB from "../../functions"
import { useAppDispatch } from "../../redux/hooks"
import { userHandler } from "../../redux/reducers/userSlice"
import { alertHandler, confirmHandler, modalHandler } from "../../redux/reducers/sampleSlice"
import { useNavigate } from "react-router-dom"
import { classList, days } from "../../dexybase/attendency"
import { styled } from "@stitches/react"
import { AButton, DexyButtonWrap } from "../forAttendency"
import { dexyRGB } from "../../dexybase"
import { db, dbService } from "../../firebase"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { attendencyHandler } from "../../redux/reducers/attendencySlice"

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
      <DexyButton title="?????????" type="submit" />
    </DexyForm>
  )
}

export const AddTimeTableModal = (props: { dispatch: AppDispatch; closeFn: () => void; type: string }) => {
  const { dispatch, closeFn, type } = props

  return <>Add TimeTable</>
}

const getDay = (day: Days) => {
  switch (day) {
    case "???":
      return "mon"
    case "???":
      return "tue"
    case "???":
      return "wed"
    case "???":
      return "thur"
    case "???":
      return "fri"
    case "???":
      return "sat"
    case "???":
      return "sun"
  }
}

export const AttendencyStudentModal = (props: { dispatch: AppDispatch; closeFn: () => void; data: AStudent[] }) => {
  const { dispatch, closeFn, data } = props

  const onClick = (student: AStudent) => {
    dispatch(attendencyHandler({ type: "student", student, status: "????????????" }))
    closeFn()
    dispatch(alertHandler({ state: true, message: `???????????????, ${student.name}!`, okBtn: "??????" }))
  }

  return (
    <>
      {data &&
        data.map((student) => (
          <AButton border={true} onClick={() => onClick(student)} key={student.name || student.phone[2]} width="100%" marginBottom={10}>
            {student.name}
          </AButton>
        ))}
      <AButton onClick={closeFn} width="100%">
        ?????? ??????
      </AButton>
    </>
  )
}

export const ShowLeftStudentsModal = (props: { dispatch: AppDispatch; closeFn: () => void; data: AStudent[] }) => {
  const { closeFn, data, dispatch } = props

  const onClick = (student: AStudent) => {
    dispatch(
      confirmHandler({
        state: true,
        message: `${student.name} ????????? ?????? ??????????????????????`,
        okBtn: "??????",
        cancelBtn: "??????",
        type: "showLeftStudents",
        data: student,
      })
    )
  }
  return (
    <>
      {data &&
        data.map((student) => (
          <AButton border={true} key={student.name || student.phone[2]} onClick={() => onClick(student)} width="100%" marginBottom={10}>
            {student.name}
          </AButton>
        ))}
      <AButton onClick={closeFn} width="100%">
        ??????
      </AButton>
    </>
  )
}
