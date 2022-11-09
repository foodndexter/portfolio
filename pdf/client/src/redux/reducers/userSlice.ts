import { createSlice } from "@reduxjs/toolkit"
import { engNeKim, samplePayments } from "../../dexybase"

const initialState: User = {
  state: false,
  id: "",
  cart: [],
  basket: [],
  lectures: [],
  payments: [],
}

const date = new Date()
const month = date.getMonth() + 1
const day = date.getDate()
const year = date.getFullYear()
const today = `${year}/${month}/${day}`
const lectureDay = 28

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
        cart = [action.payload, ...cart]
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
      } else basket = [action.payload, ...basket]

      return { ...state, basket }
    },
    paymentHandler: (state) => {
      let cart: Lecture[] = [...state.cart]
      let basket: Lecture[] = [...state.basket]
      let lectures: MyLecture[] = [...state.lectures]
      let payments: MyLecture[] = [...state.payments]

      let copy: Lecture[] = []
      cart.map((target) => {
        if (!basket.some((item) => item.id === target.id)) return (copy = [target, ...copy])
      })
      cart = copy

      let copy2: MyLecture[] = []
      // today = MM/DD/YYYY
      basket.map((target) => {
        copy2 = [...copy2, { ...target, expiresIn: lectureDay, purchasedAt: today, remaining: getRemaingDays(lectureDay, today) }]
      })
      lectures = [...copy2, ...lectures]
      payments = [...copy2, ...payments]
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

export const getRemaingDays = (expiresIn: number, purchasedAt: string) => {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const today = `${month}/${day}/${year}`

  const date1 = new Date(purchasedAt)
  const date2 = new Date(today)

  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime()

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  return expiresIn - Difference_In_Days
}
