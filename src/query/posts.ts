import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { IPost, IUser } from "../models/models";
// import type { Pokemon } from './types'

export const postsApi = createApi({
  reducerPath: "tracksApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<IPost[], any>({
      query: (limit = "") => `/posts?${limit && `_limit=${limit}`}`,
    }),
    getAllUsers: build.query<IUser[], any>({
      query: () => "/users/",
    }),
  }),
});

export const { useGetAllPostsQuery, useGetAllUsersQuery } = postsApi;
