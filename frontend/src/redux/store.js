import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer
    },
});