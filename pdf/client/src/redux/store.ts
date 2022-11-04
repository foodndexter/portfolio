import { configureStore } from "@reduxjs/toolkit"
import { sampleSlicer } from "./reducers"

export const store = configureStore({
  reducer: {
    sample: sampleSlicer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
