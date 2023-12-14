import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tracksApi = createApi({

  reducerPath: "tracksApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: (limit = "") => `/posts?${limit && `_limit=${limit}`}`,
    }),
    getAllUsers: build.query({
      query: () => '/users/',
    }),
    getPostComments: build.query({
      query: (post) => `/post/${post}/comments`,
    })
  })
})

export const { useGetAllPostsQuery, useGetAllUsersQuery, useGetPostCommentsQuery} = tracksApi