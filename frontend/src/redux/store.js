import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productReducer from './slices/productsSlice'

export const store = configureStore({
    reducer: {
        products: productReducer
    },
});