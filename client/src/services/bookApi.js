import { apiSlice } from "./Api";

export const bookApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getAllBooks: builder.query({
            query: () =>({
                url: '/book',
            })
        }),
        getAllBooksWithDetails: builder.query({
            query: () =>({
                url: '/book/admin',
            })
        }),
        getBookById: builder.query({
            query: (id)=>({
                url: `/book/${id}`
            })
        }),
        createBook: builder.mutation({
            query: data =>({
                url: `/book`,
                method: 'POST',
                body: data
            })
        }),
        updateBook: builder.mutation({
            query: data =>({
                url: `/book/${data.id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteBook: builder.mutation({
            query: (id) =>({
                url: `/book/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAllBooksQuery, useGetAllBooksWithDetailsQuery, useGetBookByIdQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = bookApi