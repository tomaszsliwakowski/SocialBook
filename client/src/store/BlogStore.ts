import { configureStore } from "@reduxjs/toolkit";
import BlogSliceReducer from "./BlogSlice";

export const BlogStore = configureStore({
  reducer: {
    blogData: BlogSliceReducer,
  },
});

export type RootState = ReturnType<typeof BlogStore.getState>;
export type AppDispatch = typeof BlogStore.dispatch;
