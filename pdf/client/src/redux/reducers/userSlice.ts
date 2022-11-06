import { createSlice } from "@reduxjs/toolkit"

const initialState: User = { id: "", cart: [], basket: [], lectures: [], payments: [] }

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHandler: (state, action: { payload: "off" | User }) => {
      if (action.payload === "off") {
        return { ...initialState }
      } else {
        return { state: true, ...action.payload }
      }
    },
  },
})

export const { userHandler } = userSlice.actions
export default userSlice.reducer
