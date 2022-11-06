import { createSlice } from "@reduxjs/toolkit"

const initialState: Sample = {
  backgroundColor: "white",
  color: "black",
  fontSize: 20,
  fontWeight: 400,
  activeMenu: false,
  alert: { state: false, message: "메세지를 입력하세요", okBtn: "확인" },
  confirm: { state: false, message: "메세지를 입력하세요", okBtn: "확인", cancelBtn: "취소" },
  modal: { state: false, type: "" },
}

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    menuHandler: (state, action: HandleMenu) => {
      switch (action.payload) {
        case "off":
          return { ...state, activeMenu: false, alert: { state: false }, modal: { state: false }, confirm: { state: false } }
        case "on":
          return { ...state, activeMenu: true, alert: { state: false }, modal: { state: false }, confirm: { state: false } }
        case "toggle":
          return { ...state, activeMenu: !state.activeMenu, alert: { state: false }, modal: { state: false }, confirm: { state: false } }
      }
    },
    alertHandler: (state, action: { payload: "off" | Popup }) => {
      if (action.payload === "off") {
        return { ...state, alert: { state: false } }
      } else {
        const { cancelBtn, message, okBtn } = action.payload
        return { ...state, alert: { state: true, cancelBtn, message, okBtn } }
      }
    },
    confirmHandler: (state, action: { payload: "off" | Popup }) => {
      if (action.payload === "off") {
        return { ...state, confirm: { state: false } }
      } else {
        const { cancelBtn, message, okBtn, type } = action.payload
        return { ...state, confirm: { state: true, cancelBtn, message, okBtn, type } }
      }
    },
    modalHandler: (state, action: { payload: "off" | string }) => {
      const { payload } = action
      if (payload === "off") {
        return { ...state, modal: { state: false } }
      } else {
        return { ...state, modal: { state: true, type: payload } }
      }
    },
  },
})

export const { menuHandler, alertHandler, confirmHandler, modalHandler } = sampleSlice.actions

export default sampleSlice.reducer
