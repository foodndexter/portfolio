import React, { useEffect, useState } from "react"
import { useStateContext } from "../contextApi/StateProvider"
import { styled } from "@stitches/react"
import { AButton } from "../components/forAttendency"
import { IoIosArrowBack } from "react-icons/io"
import { FiSearch } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { alertHandler } from "../redux/reducers/sampleSlice"
import { liftArray,  } from "../redux/reducers/lifter"

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

  const find = () => {
    let found: AStudent[] = []
    if (input.length <= 3) {
      dispatch(alertHandler({ state: true, message: "4자리 모두 입력해주세요", okBtn: "확인" }))
    } else {
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
  }
  const ButtonWidth = "33.3333333333333333%"
  const ButtonHeight = "25%"

  const Container = styled("div", {
    width: "calc(100% - 20px)",
    maxWidth: 500,
  })
  const ButtonWrap = styled("div", {
    width: "100%",
    height: `calc(100vh - 240px)`,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    position: "relative",
    maxHeight: 600,
    marginBottom: 10,
  })

  const InputWrap = styled("div", {
    width: "100%",
    margin: "10px 0",
    display: "flex",
    marginTop: 70,
    justifyContent: "center",
    position: "relative",
  })

  const Span = styled("span", {
    width: "20%",
    height: 2,
    borderRadius: 100,
    backgroundColor: "Black",
    display: "block",
    margin: "0 10px",
  })

  const Numbers = styled("div", {
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
  })

  const Number = styled("span", {
    width: "20%",
    display: "block",
    margin: "0 10px",
    textAlign: "center",
    fontSize: 40,
    fontWeight: 400,
  })
  return (
    <Container>
      <InputWrap>
        <Numbers>
          <Number>{input[0]}</Number>
          <Number>{input[1]}</Number>
          <Number>{input[2]}</Number>
          <Number>{input[3]}</Number>
        </Numbers>
        <Span />
        <Span />
        <Span />
        <Span />
      </InputWrap>
      <ButtonWrap>
        {numbers &&
          numbers.map((number) => (
            <AButton width={ButtonWidth} height={ButtonHeight} border={true} key={number} onClick={() => onClick(number)} fontSize={30}>
              {number}
            </AButton>
          ))}
        <AButton width={ButtonWidth} height={ButtonHeight} position="absolute" onClick={reset} left={0} bottom={0} fontSize={30}>
          reset
        </AButton>
        <AButton width={ButtonWidth} height={ButtonHeight} position="absolute" onClick={backSpace} bottom={0} right={0}>
          <IoIosArrowBack size={30} />
        </AButton>
      </ButtonWrap>
      <AButton onClick={find} width="100%">
        <FiSearch size={20} /> 찾기
      </AButton>
    </Container>
  )
}

export default AttendencyStudents
