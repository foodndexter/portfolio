import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {}

const lifterSlice = createSlice({
  name: "lifter",
  initialState,
  reducers: {
    liftHandler: (state, action) => {
      return { ...action.payload }
    },
  },
})

export const { liftHandler } = lifterSlice.actions
export default lifterSlice.reducer
