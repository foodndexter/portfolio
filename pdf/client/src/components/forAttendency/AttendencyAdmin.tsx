import { styled } from "@stitches/react"
import React, { Suspense, lazy, useEffect, useState } from "react"
import { dexyRGB } from "../../dexybase"
import { AButton, DexyButtonWrap } from "./AttendecyNodes"
import { AiOutlineSchedule } from "react-icons/ai"
import { IoPeopleCircleOutline } from "react-icons/io5"
import { FiSettings } from "react-icons/fi"
import { useAppSelector } from "../../redux/hooks"

const AdminSetting = lazy(() => import("./AdminSetting"))
const AdminST = lazy(() => import("./AdminST"))
const AdminTT = lazy(() => import("./AdminTT"))

const color = `rgb(${dexyRGB.navy})`
type Option = "시간표관리" | "학생관리" | "환경설정" | ""
const AttendencyAdmin = () => {
  const options: Option[] = ["시간표관리", "학생관리", "환경설정"]
  const [contents, setContents] = useState<Option>("시간표관리")
  const [contentsIndex, setContentsIndex] = useState(0)

  const icons = [<AiOutlineSchedule size={20} />, <IoPeopleCircleOutline size={20} />, <FiSettings size={20} />]

  const onClick = (option: Option, index: number) => {
    setContents(option)
    setContentsIndex(index)
  }

  const { timetable, classList, studentList } = useAppSelector((state) => state.attendency)

  const fallBack = () => <span>Loading...</span>
  return (
    <Container>
      <DexyButtonWrap>
        {options &&
          options.map((button, index) => (
            <AButton key={button} onClick={() => onClick(button, index)} fontSize={16} border={index === contentsIndex ? false : true} width="100%" margin={5}>
              <span style={{ marginRight: 10 }}>{button}</span>
              {icons[index]}
            </AButton>
          ))}
      </DexyButtonWrap>
      <Contents>
        <Suspense fallback={fallBack()}>
          {
            {
              시간표관리: <AdminTT timetable={timetable} color={color} />,
              학생관리: <AdminST color={color} />,
              환경설정: <AdminSetting />,
              "": <>Choose one of the options above</>,
            }[contents]
          }
        </Suspense>
      </Contents>
    </Container>
  )
}

export default AttendencyAdmin

const Container = styled("div", {
  border: "1px solid",
  borderRadius: 3,
  padding: 5,
  maxWidth: 500,
  margin: "0 auto",
  color,
})

const Contents = styled("div", {
  border: "1px solid",
  borderRadius: 3,
  maxWidth: 500,
  margin: 5,
  padding: 5,
  color,
  display: "flex",
  flexDirection: "column",
})

const OptionButton = styled("button", {
  width: "100%",
  height: 50,
  padding: 10,
  display: "flex",
  justifyContent: "space-between",
  border: `1px solid`,
  color,
  borderRadius: 3,
  margin: 5,
  alignItems: "center",
  fontSize: 16,
})
