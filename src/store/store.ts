import { configureStore } from "@reduxjs/toolkit";
import postsReduser from "./slices/posts"
import { postsApi } from "../query/posts"


const store = configureStore({
  reducer: {
    posts: postsReduser,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;