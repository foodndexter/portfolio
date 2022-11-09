import React, { useEffect, useState } from "react"
import { useStateContext } from "../contextApi/StateProvider"
import { styled } from "@stitches/react"
import { AButton } from "../components/forAttendency"
import { IoIosArrowBack } from "react-icons/io"
import { FiSearch } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { alertHandler } from "../redux/reducers/sampleSlice"
import { liftArray, liftHandler } from "../redux/reducers/lifter"

const AttendencyStudents = () => {
  const { screen } = useStateContext()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    screen.width <= 500 && setWidth(screen.width)
  }, [screen])

  useEffect(() => {
    let ratio = 0

    ratio = ((width - 60) / 9) * 16
    setHeight(ratio)
  }, [width])

  const [input, setInput] = useState("1234")

  const onChange = (e: any) => {
    setInput(e.target.value)
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  const onClick = (number: number) => {
    setInput((prev) => (prev.length < 4 ? `${prev}${number}` : prev))
  }

  const reset = () => setInput("")

  const backSpace = () => {
    setInput((prev) => (prev.length > 0 ? prev.replace(prev[prev.length - 1], "") : prev))
  }

  const { studentList } = useAppSelector((state) => state.attendency)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(studentList[1].status)
  }, [studentList])
  const find = () => {
    let found: AStudent[] = []
    studentList.map((student) => {
      const target = student.phone[2]
      if (target === input) {
        console.log(student)
        return (found = [...found, student])
      }
    })

    console.log(found)
    if (found.length > 0) {
      dispatch(alertHandler({ state: true, type: "attendencyStudent", okBtn: "취소" }))
      dispatch(liftArray(found))
    } else dispatch(alertHandler({ state: true, message: "없는 번호입니다.", okBtn: "확인" }))
    setInput("")
  }
  const ButtonWidth = "33.3333333333333333%"
  const ButtonHeight = "25%"

  const ButtonWrap = styled("div", {
    width: "100%",
    height: `calc(100vh - 240px)`,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    position: "relative",
  })

  const InputWrap = styled("div", {
    width: "100%",
    margin: "10px 0",
    height: 50,
    display: "flex",
    flexDirection: "column",
  })

  const TextInput = styled("input", {
    textAlign: "center",
    height: "100%",
    fontSize: 20,
    border: "1px solid",
    borderRadius: 3,
  })
  return (
    <div>
      <InputWrap>
        <TextInput value={input} onChange={onChange} type="text" />
      </InputWrap>
      <ButtonWrap>
        {numbers &&
          numbers.map((number) => (
            <AButton width={ButtonWidth} height={ButtonHeight} border={true} key={number} onClick={() => onClick(number)}>
              {number}
            </AButton>
          ))}
        <AButton width={ButtonWidth} height={ButtonHeight} position="absolute" onClick={reset} left={0} bottom={0}>
          reset
        </AButton>
        <AButton width={ButtonWidth} height={ButtonHeight} position="absolute" onClick={backSpace} bottom={0} right={0}>
          <IoIosArrowBack size={18} />
        </AButton>
      </ButtonWrap>
      <AButton onClick={find}>
        <FiSearch size={20} /> 찾기
      </AButton>
    </div>
  )
}

export default AttendencyStudents
