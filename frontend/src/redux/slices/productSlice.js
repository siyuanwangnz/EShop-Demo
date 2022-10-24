import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const fetchProduct = createAsyncThunk(
    'fetchProduct',
    async ({ id, delay = 0 }, { rejectWithValue }) => {
        try {
            // add delay for pending stage testing
            await new Promise((resolve) =>
                setTimeout(() => resolve(), delay)
            )
            const { data } = await axios.get(`/api/products/${id}`)
            return data
        } catch (error) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: { reviews: [] },
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.product = action.payload
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export default productSlice.reducer