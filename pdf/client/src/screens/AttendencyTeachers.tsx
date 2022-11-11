import { styled } from "@stitches/react"
import React, { lazy, Suspense, ReactNode, useEffect, useState } from "react"
import { AButton, AContainer, DexyButtonWrap } from "../components/forAttendency"
import { dexyRGB } from "../dexybase"
import { TbUserExclamation } from "react-icons/tb"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { alertHandler, modalHandler } from "../redux/reducers/sampleSlice"
import { liftArray } from "../redux/reducers/lifter"

const TimeTable = lazy(() => import("../components/forAttendency/TimeTable"))
const AttendencyRoll = lazy(() => import("../components/forAttendency/AttendencyRoll"))
const AttendencyAdmin = lazy(() => import("../components/forAttendency/AttendencyAdmin"))

const AttendencyTeachers = () => {
  const [contents, setContents] = useState<TeacherPages>("timetable")

  const onClick = (content: TeacherPages) => {
    setContents(content)
  }

  const tPages: TeacherPages[] = ["timetable", "attendency", "admin"]

  const color = `rgb(${dexyRGB.navy})`

  const base = () => <p>Loading...</p>

  const [targetClass, setTargetClass] = useState<Schedule>({ time: "", class: "" })

  const changeContents = (content: TeacherPages, schedule: Schedule) => {
    setContents(content)
    setTargetClass(schedule)
  }

  const [leftStudents, setLeftStudents] = useState<AStudent[]>([])
  const youRemain = (student: AStudent) =>
    setLeftStudents((prev) => {
      const check = prev.find((target) => target.name === student.name && target.phone[2] === student.phone[2])
      return check ? prev : [...prev, student]
    })
  return (
    <>
      <DexyButtonWrap justifyContent="center" marginTop={5}>
        {tPages &&
          tPages.map((button, index) => (
            <AButton
              color={contents === tPages[index] ? "white" : color}
              backgroundColor={contents === tPages[index] ? color : "white"}
              key={button}
              onClick={() => onClick(button)}
              margin={5}>
              {button === "timetable" ? "시간표" : button === "attendency" ? "출석부" : "설정"}
            </AButton>
          ))}
      </DexyButtonWrap>
      <Suspense fallback={base()}>
        <AContainer>
          {
            {
              timetable: <TimeTable changeContents={changeContents} />,
              attendency: <AttendencyRoll targetClass={targetClass} youRemain={youRemain} />,
              admin: <AttendencyAdmin />,
            }[contents]
          }
        </AContainer>
      </Suspense>
      <ForLeft leftStudents={leftStudents} />
    </>
  )
}

export default AttendencyTeachers

const ForLeft = (props: { leftStudents: AStudent[] }) => {
  const { leftStudents } = props
  const Div = styled("div", {
    position: "fixed",
    bottom: 20,
    width: "100%",
    maxWidth: 1200,
    left: "50%",
    transform: "translateX(-50%)",
  })

  const Button = styled("button", {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 20,
    color: `rgb(${dexyRGB.navy})`,
    border: "2px solid",
    "&:hover": {
      boxShadow: `0 3px 6px rgba(${dexyRGB.navy}, .2)`,
    },
  })
  const Span = styled("span", {
    position: "absolute",
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: `rgb(${dexyRGB.red})`,
    color: "white",
  })

  const dispatch = useAppDispatch()
  const onClick = () => {
    if (studentList.length > 0) {
      dispatch(modalHandler("showLeftStudents"))
      dispatch(liftArray(studentList))
    } else dispatch(alertHandler({ state: true, message: "남은 학생이 없습니다", okBtn: "확인" }))
  }

  const { attendency } = useAppSelector((state) => state)
  useEffect(() => {
    let copy: AStudent[] = []
    leftStudents &&
      leftStudents.map((student) => {
        const foundStudent = attendency.studentList.find((target) => (target.name === student.name && target.phone[2] === student.phone[2] ? target : null))
        // return (copy = [...copy, foundStudent])
        if (foundStudent?.status === "남음") return (copy = [...copy, foundStudent])
      })
    setStudentList(copy)
  }, [leftStudents])

  const [studentList, setStudentList] = useState<AStudent[]>(leftStudents ? leftStudents : [])

  return (
    <Div>
      <Button onClick={onClick}>
        {studentList.length > 0 && <Span>{studentList.length}</Span>}
        <TbUserExclamation size={20} color={`rgb(${dexyRGB.navy})`} />
      </Button>
    </Div>
  )
}
