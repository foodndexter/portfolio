import { createSlice } from "@reduxjs/toolkit"

const initialState: User = { state: true, id: "", cart: [], basket: [], lectures: [], payments: [] }

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
    cartHandler: (state, action: { payload: Lecture }) => {
      let cart: Lecture[] = [...state.cart]
      const { id } = action.payload
      console.log(cart)
      const check = cart.length > 0 && cart.find((item) => item.id === id)
      if (check) {
        let copy: Lecture[] = [...cart]
        cart = copy.filter((item) => item.id !== id)
      } else {
        cart = [...cart, action.payload]
      }

      return { ...state, cart }
    },
    basketHandler: (state, action: { payload: Lecture }) => {
      let basket: Lecture[] = [...state.basket]
      const { id } = action.payload

      const check = basket.find((item) => item.id === id)

      if (check) {
        let copy: Lecture[] = [...basket]
        basket = copy.filter((item) => item.id !== id)
      } else basket = [...basket, action.payload]

      return { ...state, basket }
    },
  },
})

export const { userHandler, cartHandler, basketHandler } = userSlice.actions
export default userSlice.reducer
