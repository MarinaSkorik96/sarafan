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
      // providesTags: (result) =>
      //   result
      //     ? [
      //       ...result.map(({ id }) => ({ type: 'Posts', id })),
      //       { type: 'Posts', id: 'LIST' },
      //     ]
      //     : [{ type: 'Posts', id: 'LIST' }],
    }),
    getAllUsers: build.query({
      query: () => '/users/',
    }),
    getAllComments: build.query({
      query: () => '/comments/',
    }),
    getPostComments: build.query({
      query: (post) => `/post/${post}/comments`,
    })
  })
})

export const { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery, useGetPostCommentsQuery} = tracksApi