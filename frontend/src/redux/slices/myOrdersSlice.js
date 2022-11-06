import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const getMyOrders = createAsyncThunk(
    'getMyOrders',
    async ({ delay = 0 }, { rejectWithValue, getState }) => {
        try {
            // add delay for pending stage testing
            await new Promise((resolve) =>
                setTimeout(() => resolve(), delay)
            )

            // get userInfo from state
            const { user } = getState()
            const { userInfo } = user

            // set header config 
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            // get with json and header config
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/orders/myorders`,
                config
            )

            return data
        } catch (error) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState: {
        orders: [],
        status: 'idle',
        error: null
    },
    reducers: {
        reset: (state) => {
            state.error = null
            state.orders = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyOrders.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.orders = action.payload
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export const { reset } = myOrdersSlice.actions

export default myOrdersSlice.reducer