import { styled } from "@stitches/react"
import React, { ReactNode, useEffect, useState } from "react"
import { AButton, DexyButtonWrap } from "../components/forAttendency"
import { dexyRGB } from "../dexybase"
import { useAppSelector } from "../redux/hooks"

const AttendencyTeachers = () => {
  const { studentList } = useAppSelector((state) => state.attendency)

  useEffect(() => {
    console.log(studentList)
  }, [studentList])

  const [contents, setContents] = useState<TeacherPages>("timetable")

  const onClick = (content: TeacherPages) => {
    setContents(content)
  }

  const tPages: TeacherPages[] = ["timetable", "attendency", "admin"]

  const color = `rgb(${dexyRGB.navy})`

  return (
    <>
      <DexyButtonWrap>
        {tPages &&
          tPages.map((button, index) => (
            <AButton
              color={contents === tPages[index] ? "white" : color}
              backgroundColor={contents === tPages[index] ? color : "white"}
              key={button}
              onClick={() => onClick(button)}
            >
              {button === "timetable" ? "시간표" : button === "attendency" ? "출석부" : "설정"}
            </AButton>
          ))}
      </DexyButtonWrap>
    </>
  )
}

export default AttendencyTeachers

const Tabs = styled("div", {
  width: "100%",
})
