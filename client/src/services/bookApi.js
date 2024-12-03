import { apiSlice } from "./Api";

export const bookApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getAllBooks: builder.query({
            query: () =>({
                url: '/book',
            })
        }),
        getBookById: builder.query({
            query: (id)=>({
                url: `/book/${id}`
            })
        })
        
    })
})

export const { useGetAllBooksQuery, useGetBookByIdQuery } = bookApi