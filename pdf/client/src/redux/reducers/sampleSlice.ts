import { createSlice } from "@reduxjs/toolkit"

const initialState: Sample = {
  backgroundColor: "white",
  color: "black",
  fontSize: 20,
  fontWeight: 400,
  activeMenu: false,
}

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    menuHandler: (state, action: HandleMenu) => {
      switch (action.payload) {
        case "off":
          return { ...state, activeMenu: false }
        case "on":
          return { ...state, activeMenu: true }
        case "toggle":
          return { ...state, activeMenu: !state.activeMenu }
      }
    },
  },
})

export const { menuHandler } = sampleSlice.actions

export default sampleSlice.reducer
