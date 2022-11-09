import { configureStore } from "@reduxjs/toolkit"
import { sampleSlicer, userSlicer, lifterSlicer, attendencySlicer } from "./reducers"

export const store = configureStore({
  reducer: {
    sample: sampleSlicer,
    user: userSlicer,
    lifter: lifterSlicer,
    attendency: attendencySlicer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
