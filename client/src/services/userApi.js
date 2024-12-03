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
        })
    })
})

export const { useLoginMutation, useRegistrationMutation, useGetAllUsersQuery, useLogoutMutation, useRefreshMutation } = authApi