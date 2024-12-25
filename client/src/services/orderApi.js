import { apiSlice } from "./Api";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        createOrder: builder.mutation({
            query: data =>({
                url: `/order`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useCreateOrderMutation } = orderApi