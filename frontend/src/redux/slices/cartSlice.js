import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const addToCart = createAsyncThunk(
    'addToCart',
    async ({ id, qty, delay = 0 }, { rejectWithValue }) => {
        try {
            // add delay for pending stage testing
            await new Promise((resolve) =>
                setTimeout(() => resolve(), delay)
            )
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`)
            return {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        } catch (error) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        status: 'idle',
        error: null
    },
    reducers: {
        removeFromCart: (state, action) => {
            state.error = null

            const item = action.payload
            state.cartItems = state.cartItems.filter((x) => x.product !== item.product)

            // store new cart items to browser storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeAll: (state) => {
            state.error = null

            state.cartItems = []

            // remove items from browser storage
            localStorage.removeItem('cartItems')
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload

            // store new cart items to browser storage
            localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload

            // store new cart items to browser storage
            localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                const item = action.payload

                const existItem = state.cartItems.find((x) => x.product === item.product);

                if (existItem) {
                    state.cartItems = state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    )
                } else {
                    state.cartItems = [...state.cartItems, item]
                }

                // store cart items to browser storage
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export const { removeFromCart, removeAll, saveShippingAddress, savePaymentMethod } = cartSlice.actions

export default cartSlice.reducer