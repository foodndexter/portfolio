import { createSlice } from "@reduxjs/toolkit"
import { studentList } from "../../dexybase/attendency"

const initialState: { theme: Theme; studentList: AStudent[] } = {
  theme: {
    color: "black",
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: 400,
  },
  studentList,
}

const attendecySlice = createSlice({
  name: "attendency",
  initialState,
  reducers: {
    attendencyHandler: (state, action: { payload: { type: "student" | "teacher"; student: AStudent; status?: AStatus } }) => {
      let studentList: AStudent[] = [...state.studentList]
      const { student, type, status } = action.payload
      const index = studentList.findIndex((target) => {
        if (target.phone[2] === student.phone[2] && target.name === student.name) return target
      })

      if (index >= 0) {
        let copy: AStudent = { ...studentList[index] }
        type === "student" ? (copy = { ...copy, status: "출석" }) : status ? (copy = { ...copy, status }) : (copy = { ...copy })
        console.log(copy.status)
        studentList[index] = copy
      }

      return { ...state, studentList }
    },
    classAttendeyHandler: (state, action: { payload: { targetClass: ClassList; status: AStatus } }) => {
      let studentList: AStudent[] = [...state.studentList]
      const { status, targetClass } = action.payload

      let copy: AStudent[] = []
      studentList.map((student) => (student.class === targetClass ? (copy = [...copy, { ...student, status: status }]) : (copy = [...copy, student])))

      studentList = copy

      console.log(copy)
      return { ...state, studentList }
    },
  },
})

export const { attendencyHandler, classAttendeyHandler } = attendecySlice.actions
export default attendecySlice.reducer
