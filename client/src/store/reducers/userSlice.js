import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: '',
        isAuth: false,
    },
    reducers: {
        setUserData: (state, action)=>{
            const {role, isAuth} = action.payload
            state.isAuth = isAuth
            state.role = role
        },
    },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer