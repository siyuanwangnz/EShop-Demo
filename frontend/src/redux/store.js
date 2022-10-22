import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = configureStore({
    reducer: {},
});