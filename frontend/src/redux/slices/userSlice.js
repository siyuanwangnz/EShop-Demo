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
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }

            // post with json and header config
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/login`,
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

export const userRegister = createAsyncThunk(
    'userRegister',
    async ({ name, email, password, delay = 0 }, { rejectWithValue }) => {
        try {
            // add delay for pending stage testing
            await new Promise((resolve) =>
                setTimeout(() => resolve(), delay)
            )

            // set header config 
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }

            // post with json and header config
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users`,
                { name, email, password },
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

export const updateProfile = createAsyncThunk(
    'updateProfile',
    async ({ updatedUser, delay = 0 }, { rejectWithValue, getState }) => {
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
                `${process.env.REACT_APP_BASE_URL}/api/users/profile`,
                updatedUser,
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
        error: null
    },
    reducers: {
        userLogout: (state) => {
            state.userInfo = null
            state.error = null

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
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.userInfo = action.payload

                // store user info to browser storage
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase(userRegister.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.userInfo = action.payload

                // store user info to browser storage
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.userInfo = action.payload

                // store user info to browser storage
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })


    },
})

export const { userLogout } = userSlice.actions;

export default userSlice.reducer