import {combineReducers, configureStore} from '@reduxjs/toolkit';
import toggleReducer from './reducers/toggleSlice'
import userReducer from './reducers/userSlice'
import cartReducer from './reducers/cartSlice'
import authReducer from './reducers/authSlice'
import {apiSlice} from "../services/Api";

const rootReducer  = combineReducers ({
    [apiSlice.reducerPath]: apiSlice.reducer,
    toggle: toggleReducer,
    user: userReducer,
    cart: cartReducer,
    auth: authReducer,
})

export const setStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })
}