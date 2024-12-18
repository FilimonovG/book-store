import { apiSlice } from "./Api";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getAllCategories: builder.query({
            query: () =>({
                url: '/category',
            })
        }),
        getCategoryById: builder.query({
            query: (id)=>({
                url: `/category/${id}`
            })
        }),
    })
})

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } = categoryApi