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
    attendencyHandler: (state, action: { payload: { type: "student"; student: AStudent } }) => {
      let studentList: AStudent[] = [...state.studentList]
      const { student, type } = action.payload
      const index = studentList.findIndex((target) => {
        if (target.phone[2] === student.phone[2] && target.name === student.name) return target
      })

      if (index >= 0) {
        let copy: AStudent = { ...studentList[index] }
        copy = { ...copy, status: "attended" }
        studentList[index] = copy
      }

      return { ...state, studentList }
    },
  },
})

export const { attendencyHandler } = attendecySlice.actions
export default attendecySlice.reducer
