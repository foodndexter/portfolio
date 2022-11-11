import { styled } from "@stitches/react"
import React, { SetStateAction, useEffect, useState } from "react"
import { isPropertySignature } from "typescript"
import { days } from "../../dexybase/attendency"
import { useAppSelector } from "../../redux/hooks"
import { AButton, AContainer, DexyButtonWrap } from "./AttendecyNodes"

const TimeTable = (props: { changeContents: (content: TeacherPages, schedule: Schedule) => void }) => {
  const { changeContents } = props
  const { timetable } = useAppSelector((state) => state.attendency)

  const [contents, setContents] = useState<Days>("")

  const [today, setToday] = useState<Days>("")

  const date = new Date()

  useEffect(() => {
    const day = date.getDay()
    setToday(getDay(day))
  }, [date])

  useEffect(() => {
    if (today.length > 0) {
      setContents(today)
    }
  }, [today])

  const onClick = (schedule: Schedule) => {
    changeContents("attendency", schedule)
  }

  console.log(timetable)
  return (
    <Table>
      <DexyButtonWrap justifyContent="center" flexDirection="row" width="100%">
        {days &&
          days.map((item) => (
            <AButton key={item} border={contents === item ? false : true} onClick={() => setContents(item)} margin="0 2.5px">
              {item}
            </AButton>
          ))}
      </DexyButtonWrap>

      {timetable &&
        timetable.map((item) =>
          item.day === contents ? (
            <DexyButtonWrap justifyContent="center" flexDirection="column" key={item.day} marginTop={10}>
              {item.schedule && (
                item.schedule.map((schedule) => (
                  <AButton onClick={() => onClick(schedule)} key={schedule.time} border={true} marginBottom={10}>
                    <span style={{ flex: 1 }}>{schedule.time}</span>
                    <span style={{ flex: 1 }}>{schedule.class}</span>
                  </AButton>
                ))
              )}
            </DexyButtonWrap>
          ) : null
        )}
    </Table>
  )
}

export default TimeTable

const getDay = (index: number): Days => {
  switch (index) {
    case 0:
      return "일"
    case 1:
      return "월"
    case 2:
      return "화"
    case 3:
      return "수"
    case 4:
      return "목"
    case 5:
      return "금"
    case 6:
      return "토"
    default:
      return ""
  }
}

const Table = styled("div", {
  maxWidth: 500,
  textAlign: "center",
  margin: "0 auto",
})
