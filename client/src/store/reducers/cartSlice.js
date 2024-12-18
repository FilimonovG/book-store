import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[]
    },
    reducers: {
        addBook: (state, action)=>{
            const {book} = action.payload
            state.items.push(book)
        },
        removeBook: (state, action)=>{
            const {book} = action.payload
            state.items.remove(book)
        },
    },
})

export const { addBook, removeBook } = cartSlice.actions

export default cartSlice.reducer

