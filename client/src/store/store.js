import {combineReducers, configureStore} from '@reduxjs/toolkit';
import toggleReducer from './reducers/toggleSlice'
import userReducer from './reducers/userSlice'
import authReducer from './reducers/AuthSlice'
import {apiSlice} from "../services/Api";

const rootReducer  = combineReducers ({
    [apiSlice.reducerPath]: apiSlice.reducer,
    toggle: toggleReducer,
    userReducer,
    auth: authReducer,
})

export const setStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })
}