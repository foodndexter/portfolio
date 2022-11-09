import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { AButton } from "../components/forAttendency"

const Attendency = () => {
  return <Buttons />
}

export default Attendency

const Buttons = () => {
  const navi = useNavigate()
  const onClick = (path: string) => {
    console.log(path)
    navi(`/attendency/${path}`)
  }
  return (
    <>
      <AButton onClick={() => onClick("teacher")}>선생님용</AButton>
      <AButton onClick={() => onClick("student")}>학생용</AButton>
    </>
  )
}
