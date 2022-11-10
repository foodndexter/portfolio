import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { dexyRGB } from "../dexybase"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { liftArray } from "../redux/reducers/lifter"
import { alertHandler, modalHandler } from "../redux/reducers/sampleSlice"

const color = `rgb(${dexyRGB.navy})`

const AttendencyStudents = () => {
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  const [input, setInput] = useState("")

  const onNumbers = (e: any) => {
    const { name } = e.target
    setInput((prev) => {
      if (prev.length < 4) {
        return `${prev}${name}`
      } else return prev
    })
  }

  useEffect(() => {
    setCanFind((prev) => (input.length === 4 ? true : false))
  }, [input])
  const [canFind, setCanFind] = useState(false)

  const FindButton = styled("button", {
    ...forButtons,
    backgroundColor: color,
    color: "White",
    position: "absolute",
    bottom: 0,
    right: 0,
    visibility: canFind ? "visible" : "hidden",
  })

  const onReset = () => setInput("")

  const { studentList } = useAppSelector((state) => state.attendency)
  const dispatch = useAppDispatch()

  const onFind = () => {
    if (canFind) {
      let copy: AStudent[] = []
      studentList && studentList.map((student) => (student.phone[2] === input ? (copy = [...copy, student]) : null))
      if (copy.length > 0) {
        dispatch(modalHandler("attendencyStudent"))
        dispatch(liftArray(copy))
      } else dispatch(alertHandler({ state: true, message: "존재하지 않는 번호입니다.", okBtn: "다시 찾기" }))
      setInput("")
    }
  }
  return (
    <Container>
      <NumberSection>
        <SpanWrap>
          <Numbers>{input[0]}</Numbers>
          <Numbers>{input[1]}</Numbers>
          <Numbers>{input[2]}</Numbers>
          <Numbers>{input[3]}</Numbers>
        </SpanWrap>
        <SpanWrap>
          <NumberSpan />
          <NumberSpan />
          <NumberSpan />
          <NumberSpan />
        </SpanWrap>
      </NumberSection>
      <ButtonSection>
        {buttons &&
          buttons.map((button, index) => (
            <Buttons key={button} name={String(button)} onClick={onNumbers}>
              {button}
            </Buttons>
          ))}
        <ResetButton onClick={onReset}>RESET</ResetButton>
        <FindButton onClick={onFind}>찾기</FindButton>
      </ButtonSection>
    </Container>
  )
}

export default AttendencyStudents

const Container = styled("div", {
  width: "100%",
  height: "calc(100vh - 60px)",
  maxWidth: 768,
})

const NumberSection = styled("div", {
  height: 100,
  position: "relative",
  marginBottom: 10,
})

const SpanWrap = styled("div", {
  width: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
})

const NumberSpan = styled("span", {
  display: "block",
  height: 3,
  borderRadius: 1000,
  width: "20%",
  backgroundColor: color,
  margin: "0 10px",
})

const Numbers = styled("span", {
  width: "20%",
  margin: "0 10px",
  textAlign: "center",
  fontSize: 50,
  color,
})

const ButtonSection = styled("div", {
  height: "calc(100% - 110px)",
  position: "relative",
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
})

const forButtons = {
  width: "calc(33.333333333% - 10px)",
  height: "calc(25% - 10px)",
  backgroundColor: `rgba(${dexyRGB.navy}, .2)`,
  color,
  fontSize: 40,
  margin: 5,
  borderRadius: 3,
}
const Buttons = styled("button", forButtons)

const ResetButton = styled("button", { ...forButtons, backgroundColor: color, color: "White", position: "absolute", bottom: 0, left: 0 })
