import { configureStore } from "@reduxjs/toolkit";
import postsReduser from "./slices/posts"
import { tracksApi } from "../query/posts"


export default configureStore({
  reducer: {
    posts: postsReduser,
    [tracksApi.reducerPath]: tracksApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tracksApi.middleware)
})