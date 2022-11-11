import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { useStateContext } from "../../contextApi/StateProvider"
import { A_Status } from "../../dexybase/attendency"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { attendencyHandler } from "../../redux/reducers/attendencySlice"
import { liftArray, liftHandler } from "../../redux/reducers/lifter"
import { confirmHandler } from "../../redux/reducers/sampleSlice"
import { AppDispatch } from "../../redux/store"
import { AButton, DexyButtonWrap } from "./AttendecyNodes"

const AttendencyRoll = (props: { targetClass: Schedule; youRemain: (student: AStudent) => void }) => {
  const { targetClass, youRemain } = props
  const { attendency } = useAppSelector((state) => state)

  const [studentList, setStudentList] = useState<AStudent[]>([])

  useEffect(() => {
    let copy: AStudent[] = []
    attendency.studentList &&
      attendency.studentList.map((student) => {
        return student.class === targetClass.class ? (copy = [...copy, student]) : copy
      })

    setStudentList(copy)
  }, [attendency.studentList])

  const [multiStatus, setMultiStatus] = useState<AStatus>("")

  const dispatch = useAppDispatch()

  const donotApplyList: AStatus[] = ["결석", "조퇴", "남음", "아픔", "걍쉼", "귀가"]

  const onClick = (status: AStatus) => {
    setMultiStatus(status)
    let targetClass: AStudent[] = []
    studentList &&
      studentList.map((student) => {
        const check = donotApplyList.find((status) => status === student.status)
        check && student.status === "남음" && youRemain(student)
        if (check) {
          return (targetClass = [...targetClass, student])
        } else return !check ? (targetClass = [...targetClass, student]) : targetClass
      })
    dispatch(liftHandler({ targetClass, status }))
    dispatch(confirmHandler({ state: true, message: `학생들을 일괄처리 하시겠습니까?`, okBtn: "처리", cancelBtn: "취소", type: "attendencyHandler" }))
  }

  useEffect(() => {
    studentList && studentList.map((student) => (student.status === "남음" ? youRemain(student) : null))
  }, [studentList])

  return (
    <div style={{ border: "1px solid", textAlign: "center", paddingBottom: 5 }}>
      <MultiButtons>
        {A_Status &&
          A_Status.map((button) => (
            <AButton border={multiStatus === button ? false : true} key={button} onClick={() => onClick(button)} margin="0 5px">
              일괄 {button}
            </AButton>
          ))}
      </MultiButtons>
      {studentList &&
        studentList.map((student) => (
          <EachStudent dispatch={dispatch} donotApplyList={donotApplyList} key={student.name || student.phone[2]} student={student} multiStatus={multiStatus} />
        ))}
    </div>
  )
}

const MultiButtons = styled("div", {
  width: "100%",
  height: 50,
  marginTop: 10,
  marginBottom: 5,
  display: "flex",
  justifyContent: "center",
})
export default AttendencyRoll

const EachStudent = (props: { student: AStudent; multiStatus: AStatus; dispatch: AppDispatch; donotApplyList: AStatus[] }) => {
  const { student, multiStatus, dispatch, donotApplyList } = props
  const { screen } = useStateContext()

  const Wrap = styled("div", {
    display: "flex",
    flexFlow: screen.width > 767 ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
  })

  useEffect(() => {
    const check = donotApplyList.find((status) => status === student.status)
    if (check) {
      setSingleStatus("")
    } else {
      if (multiStatus.length > 0) {
        setSingleStatus(multiStatus)
      }
    }
  }, [multiStatus, student])

  const [singleStatus, setSingleStatus] = useState<AStatus>("")

  const [isApplyReady, setIsApplyReady] = useState(false)

  const onClick = (student: AStudent, status: AStatus) => {
    console.log(student, status)
    if (student.status === status) {
      setSingleStatus("")
      setIsApplyReady(false)
    } else {
      setSingleStatus(status)
      setIsApplyReady(true)
    }
  }

  const onApply = () => {
    dispatch(attendencyHandler({ type: "teacher", student, status: singleStatus }))
  }

  const onCancel = () => {
    setSingleStatus("")
    setIsApplyReady(false)
  }

  return (
    <Wrap key={student.name || student.phone[2]}>
      <span style={{ width: 200, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid", height: 50, borderRadius: 3 }}>
        {student.name}: {student.status}
      </span>
      <DexyButtonWrap justifyContent="center" padding={5}>
        {A_Status &&
          A_Status.map((button) => <ESButton key={button} onClick={onClick} student={student} singleStatus={singleStatus} button={button} screen={screen} />)}
        {isApplyReady && (
          <>
            <AButton onClick={onApply} margin="0 5px" fontSize={screen.width > 767 ? 20 : 12}>
              적용
            </AButton>
            <AButton onClick={onCancel} fontSize={screen.width > 767 ? 20 : 12} margin="0 5px" border={true}>
              취소
            </AButton>
          </>
        )}
      </DexyButtonWrap>
    </Wrap>
  )
}

const ESButton = (props: { button: AStatus; student: AStudent; onClick: (student: AStudent, status: AStatus) => void; singleStatus: AStatus; screen: any }) => {
  const { student, button, onClick, singleStatus, screen } = props

  const [border, setBorder] = useState(true)

  useEffect(() => {
    if (student.status === button) {
      setBorder(false)
    } else if (singleStatus === button) {
      setBorder(false)
    } else setBorder(true)
  }, [student, singleStatus, button])
  return (
    <AButton border={border} key={button} onClick={() => onClick(student, button)} margin="0 5px" fontSize={screen.width > 767 ? 20 : 12}>
      {button}
    </AButton>
  )
}
