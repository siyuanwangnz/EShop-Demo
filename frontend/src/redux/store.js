import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'

const CartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    cart: {
        cartItems: CartItemsFromStorage
    }
}

export const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer,
        cart: cartReducer,
    },
    initialState
});