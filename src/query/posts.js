import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tracksApi = createApi({

  reducerPath: "tracksApi",
  tagTypes: ["Favorites", 'AllTracks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => '/posts/',
    }),
    getAllUsers: build.query({
      query: () => '/users/',
    }),
    getAllComments: build.query({
      query: () => '/comments/',
    }),

  })
})

export const { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery } = tracksApi