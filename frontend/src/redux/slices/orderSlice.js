import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { removeAll } from './cartSlice'

export const createOrder = createAsyncThunk(
    'createOrder',
    async ({ order, delay = 0 }, { rejectWithValue, getState, dispatch }) => {
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
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            // post with json and header config
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/orders`,
                order,
                config
            )

            // remove items from cart
            dispatch(removeAll())

            return data
        } catch (error) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getOrder = createAsyncThunk(
    'getOrder',
    async ({ id, delay = 0 }, { rejectWithValue, getState }) => {
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
                `${process.env.REACT_APP_BASE_URL}/api/orders/${id}`,
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

export const payOrder = createAsyncThunk(
    'payOrder',
    async ({ id, isPaid, delay = 0 }, { rejectWithValue, getState }) => {
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
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            // put with json and header config
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/orders/${id}/pay`,
                { isPaid },
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

export const deliverOrder = createAsyncThunk(
    'deliverOrder',
    async ({ id, isDelivered, delay = 0 }, { rejectWithValue, getState }) => {
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
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            // put with json and header config
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/orders/${id}/deliver`,
                { isDelivered },
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

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        status: 'idle',
        error: null
    },
    reducers: {
        reset: (state) => {
            state.error = null
            state.order = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.order = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase(getOrder.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.order = action.payload
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase(payOrder.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.order = action.payload
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase(deliverOrder.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deliverOrder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.order = action.payload
            })
            .addCase(deliverOrder.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export const { reset } = orderSlice.actions

export default orderSlice.reducer