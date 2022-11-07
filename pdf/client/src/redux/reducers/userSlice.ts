import { createSlice } from "@reduxjs/toolkit"
import { engNeKim } from "../../dexybase"

const initialState: User = { state: true, id: "", cart: [...engNeKim], basket: [], lectures: [], payments: [] }

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
    paymentHandler: (state) => {
      let cart: Lecture[] = [...state.cart]
      let basket: Lecture[] = [...state.basket]
      let lectures: Lecture[] = [...state.lectures]
      let payments: Lecture[] = [...state.payments]

      let copy: Lecture[] = []
      cart.map((target) => {
        if (!basket.some((item) => item.id === target.id)) return (copy = [...copy, target])
      })
      cart = copy

      copy = []
      basket.map((target) => (copy = [...copy, target]))
      lectures = [...lectures, ...copy]
      payments = [...payments, ...copy]
      basket = []

      return { ...state, cart, basket, payments, lectures }
    },
    CBController: (state, action: { payload: "select all" | "unselect all" | "empty cart" }) => {
      let cart: Lecture[] = [...state.cart]
      let basket: Lecture[] = [...state.basket]
      const { payload } = action
      if (payload === "empty cart") {
        cart = []
        basket = []
      } else if (payload === "select all") {
        basket = cart
      } else if (payload === "unselect all") {
        basket = []
      }
      return { ...state, cart, basket }
    },
  },
})

export const { userHandler, cartHandler, basketHandler, CBController, paymentHandler } = userSlice.actions
export default userSlice.reducer
