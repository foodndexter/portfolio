import { createSlice } from "@reduxjs/toolkit"

const initialState: any | MyLecture | MyLecture[] | AStudent | AStudent[] = {}

const lifterSlice = createSlice({
  name: "lifter",
  initialState,
  reducers: {
    liftHandler: (state, action) => {
      return { ...action.payload }
    },
    liftArray: (state, action) => {
      return { data: action.payload }
    },
  },
})

export const { liftHandler, liftArray } = lifterSlice.actions
export default lifterSlice.reducer
