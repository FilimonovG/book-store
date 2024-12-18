import { apiSlice } from "./Api";

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: credentials =>({
                url: '/user/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        registration: builder.mutation({
            query: credentials =>({
                url: '/user/registration',
                method: 'POST',
                body: {...credentials}
            })
        }),
        logout: builder.mutation({
            query: () =>({
                url: '/user/logout',
                method: 'POST',
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/user/refresh',
                method: 'POST',
            })
        }),
        getAllUsers: builder.query({
            query:()=>({
                url: '/user'
            })
        }),
        updateUser: builder.mutation({
            query: ({id, data}) =>({
                url: `/user/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (id) =>({
                url: `/user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation, useRefreshMutation } = authApi