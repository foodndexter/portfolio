import { createSlice } from "@reduxjs/toolkit"
import { updateStatus } from "../../api"

const initialState: { theme: Theme; studentList: AStudent[]; timetable: TimeTable[]; classList: ClassList[] } = {
  theme: {
    color: "black",
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: 400,
  },
  studentList: [],
  timetable: [],
  classList: [],
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
        status ? (copy = { ...copy, status }) : (copy = { ...copy })
        console.log(copy.status)
        studentList[index] = copy
      }
      updateStatus(studentList)
      return { ...state, studentList }
    },
    classAttendeyHandler: (state, action: { payload: { targetClass: AStudent[]; status: AStatus } }) => {
      let studentList: AStudent[] = [...state.studentList]
      const { status, targetClass } = action.payload

      let copy: AStudent[] = []
      console.log(targetClass)
      targetClass.map((target) => {
        const index = studentList.findIndex((student) => student.name === target.name && student.phone[2] === target.phone[2])
        if (index > -1) {
          let copy: AStudent = { ...studentList[index] }
          console.log(copy)
          copy = { ...copy, status }
          console.log(copy)
          studentList[index] = copy
        }
      })

      updateStatus(studentList)
      return { ...state, studentList }
    },
    attendencyDataFetched: (state, action: { payload: any }) => {
      return { ...state, ...action.payload[0] }
    },
  },
})

export const { attendencyHandler, classAttendeyHandler, attendencyDataFetched } = attendecySlice.actions
export default attendecySlice.reducer
