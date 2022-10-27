import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async ({ delay = 0 }, { rejectWithValue }) => {
        try {
            // add delay for pending stage testing
            await new Promise((resolve) =>
                setTimeout(() => resolve(), delay)
            )
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`)
            return data
        } catch (error) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
                state.products = []
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export default productsSlice.reducer