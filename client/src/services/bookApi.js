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
        }),
        updateBook: builder.mutation({
            query: ({id, data}) =>({
                url: `/book/${id}`,
                method: 'PUT',
                body: data
            })
        })
        
    })
})

export const { useGetAllBooksQuery, useGetBookByIdQuery } = bookApi