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
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                }
            }

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
        userInfo: null,
        status: 'idle',
        error: ''
    },
    reducers: {
        userLogout: (state) => {
            state.userInfo = null
            // remove user info from browser storage
            localStorage.removeItem('userInfo')

            //redirect to login page
            document.location.href = "/login"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'idle'
                state.userInfo = action.payload

                // store user info to browser storage
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    },
})

export const { userLogout } = userSlice.actions;

export default userSlice.reducer