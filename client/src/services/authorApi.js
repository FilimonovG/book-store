import { apiSlice } from "./Api";

export const authorApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getAllAuthors: builder.query({
            query: () =>({
                url: '/author/brief',
            })
        }),
    })
})

export const { useGetAllAuthorsQuery } = authorApi