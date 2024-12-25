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
        createCategory: builder.mutation({
            query: ({title}) =>({
                url: `/category`,
                method: 'POST',
                body: {title}
            })
        }),
        updateCategory: builder.mutation({
            query: ({id, title}) =>({
                url: `/category/${id}`,
                method: 'PUT',
                body: {title}
            })
        }),
        deleteCategory: builder.mutation({
            query: (id) =>({
                url: `/category/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi