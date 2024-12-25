import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[],
        total_price: 0,
        quantity: 0,
    },
    reducers: {
        addBook: (state, action)=>{
            const book = action.payload
            state.items.push(book)
            state.total_price += book.price
            state.quantity += 1
        },
        removeBook: (state, action)=>{
            const book = action.payload
            state.items = state.items.filter(item => item.id !== book.id)
            state.quantity -= book.quantity
            state.total_price -= book.price * book.quantity
        },
        increaseQuantity: (state, action)=>{
            const book = action.payload
            state.items.find(item => item.id === book.id).quantity += 1
            state.total_price += book.price
            state.quantity += 1
        },
        decreaseQuantity: (state, action)=>{
            const book = action.payload
            state.items.find(item => item.id === book.id).quantity -= 1
            state.total_price -= book.price
            state.quantity -= 1
        },
        clearCart: (state)=>{
            state.items = []
            state.total_price = 0
            state.quantity = 0
        }
    },
})

export const { addBook, removeBook, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

export const selectCart = (state) => state.cart.items

export const selectCartTotal = (state) => state.cart.total_price

export const selectCartQuantity = (state) => state.cart.quantity