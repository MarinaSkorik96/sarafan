import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tracksApi = createApi({

  reducerPath: "tracksApi",
  tagTypes: ["Favorites", 'AllTracks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (build) => ({
    getAllComments: build.query({
      query: () => '/posts/',
  }),
})
})

export const { useGetAllCommentsQuery} = tracksApi