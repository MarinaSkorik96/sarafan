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
    }),
    getAddNewPost: build.mutation({
      query: ({ title, text }) => ({
        url: `/posts`,
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: text,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: [
        { type: 'Posts', id: 'LIST' },
      ]
    }),
    getDeletePost : build.mutation({
      query: ({postId}) => ({
        url: `/posts/${postId}`
      }),
      // invalidatesTags: [
      //   { type: 'Posts', id: 'LIST' },
      // ]
    })

  })
})

export const { useGetAllPostsQuery, useGetAllUsersQuery, useGetAllCommentsQuery, useGetPostCommentsQuery, useGetAddNewPostMutation, useGetDeletePostMutation } = tracksApi