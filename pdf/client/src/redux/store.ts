import { configureStore } from "@reduxjs/toolkit"
import { sampleSlicer, userSlicer } from "./reducers"

export const store = configureStore({
  reducer: {
    sample: sampleSlicer,
    user: userSlicer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
