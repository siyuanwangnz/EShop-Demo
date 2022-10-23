import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const userLogin = createAsyncThunk(
    'userLogin',
    async ({ email, password, delay = 0 }, { rejectWithValue }) => {
        try {
            // add delay for pending stage testing
            await new Promise((resolve) =>
                setTimeout(() => resolve(), delay)
            )

            // set header config 
            const config = { headers: { 'Content-type': 'application/json' } }

            // post with json and header config
            const { data } = await axios.post(
                '/api/users/login',
                { email, password },
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

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {},
        status: 'idle',
        error: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'idle'
                state.userInfo = action.payload

                // store cart items to browser storage
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export default userSlice.reducer