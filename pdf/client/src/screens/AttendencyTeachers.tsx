import { useEffect, useState } from "react"
import { AButton, AContainer, DexyButtonWrap } from "../components/forAttendency"
import { styled } from "@stitches/react"
import { time_table } from "../dexybase/attendency"
import { useAppSelector } from "../redux/hooks"
import { useStateContext } from "../contextApi/StateProvider"

const AttendencyTeachers = () => {
  const [paging, setPaging] = useState<TeacherPages>("timetable")

  const changePaging = (name: TeacherPages) => setPaging(name)

  const Contents = styled("div", {
    border: "1px solid",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  })

  const [timeTable, setTimeTable] = useState<TimeTable[]>(time_table)

  const [targetClass, setTargetClass] = useState<ClassList>("고1반")

  const moveToAttendency = (lecture: ClassList) => {
    setTargetClass(lecture)
    setPaging("attendency")
  }

  return (
    <AContainer textAlign="center">
      <PageControlls paging={paging} changePaging={changePaging} />
      <Contents>
        {
          {
            timetable: <TimeTable timeTable={timeTable} moveToAttendency={moveToAttendency} />,
            attendency: <Attendency targetClass={targetClass} />,
            admin: <Admin />,
          }[paging]
        }
      </Contents>
    </AContainer>
  )
}

export default AttendencyTeachers

const PageControlls = (props: { paging: TeacherPages; changePaging: (name: TeacherPages) => void }) => {
  const { paging, changePaging } = props
  const pages: TeacherPages[] = ["timetable", "attendency", "admin"]

  const onClick = (name: TeacherPages) => {
    changePaging(name)
  }

  return (
    <DexyButtonWrap justifyContent="center" marginBottom={10}>
      {pages &&
        pages.map((page) => (
          <AButton border={page === paging ? false : true} key={page} onClick={() => onClick(page)} margin="0 5px">
            {page}
          </AButton>
        ))}
    </DexyButtonWrap>
  )
}

const TimeTable = (props: { timeTable: TimeTable[]; moveToAttendency: (name: ClassList) => void }) => {
  const { timeTable, moveToAttendency } = props
  const date = new Date()
  const day = date.getDay()
  const days = ["일", "월", "화", "수", "목", "금", "토"]
  const today = days[day]

  const Button = styled("button", {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 20,
    width: "100%",
    maxWidth: 300,
    margin: "0 auto",
  })

  return (
    <DexyButtonWrap flexDirection="column">
      <span>오늘: {today}요일</span>
      {timeTable &&
        timeTable.map((table) => {
          if (table.day === today)
            return (
              <DexyButtonWrap flexDirection="column" key={table.day}>
                {table.schedule &&
                  table.schedule.map((lecture) => (
                    <Button key={lecture.time} onClick={() => moveToAttendency(lecture.class)}>
                      <span>{lecture.time}</span>
                      <span>{lecture.class}</span>
                    </Button>
                  ))}
              </DexyButtonWrap>
            )
        })}
    </DexyButtonWrap>
  )
}

const Attendency = (props: { targetClass: ClassList }) => {
  const { targetClass } = props

  const { studentList } = useAppSelector((state) => state.attendency)

  const { screen } = useStateContext()

  const [students, setStudents] = useState<AStudent[]>([])

  useEffect(() => {
    studentList && setStudents(getStudents(studentList, targetClass))
  }, [studentList])

  const buttons: AStatus[] = ["출석", "결석", "조퇴", "남음", "아픔", "걍쉼", "수업끝", "학원가는길"]

  const onClick = (e: any, target: AStudent) => {
    console.log(e.target.name, target)
  }
  return (
    <>
      {targetClass ? (
        <DexyButtonWrap flexDirection="column">
          <span>{students.length > 0 ? targetClass : "반을 선택해주세요."}</span>
          <DexyButtonWrap flexDirection="column">
            {students &&
              students.map((student) => (
                <DexyButtonWrap
                  flexDirection={screen.width > -500 ? "row" : "column"}
                  flexFlow={screen.width < 500 ? "row wrap" : undefined}
                  margin="0 auto"
                  key={student.name || student.phone[2]}>
                  <div style={{ width: "100%" }}>
                    {student.name}: {student.status}
                  </div>
                  <DexyButtonWrap justifyContent="center">
                    {buttons &&
                      buttons.map((button) => (
                        <AButton
                          key={button}
                          onClick={(e: any) => onClick(e, student)}
                          border={student.status === button ? false : true}
                          fontSize={16}
                          height={60}>
                          {button}
                        </AButton>
                      ))}
                  </DexyButtonWrap>
                </DexyButtonWrap>
              ))}
          </DexyButtonWrap>
        </DexyButtonWrap>
      ) : (
        <>Loading...</>
      )}
    </>
  )
}

const Admin = () => {
  return <DexyButtonWrap flexDirection="column">Admin</DexyButtonWrap>
}

export const getStudents = (studentList: AStudent[], lecture: ClassList) => {
  let copy: AStudent[] = []
  studentList &&
    studentList.map((student) => {
      if (student.class === lecture) {
        return (copy = [...copy, student])
      }
    })
  return copy
}
