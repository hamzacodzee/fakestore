import { configureStore } from '@reduxjs/toolkit'
import fakeStoreReducer from './slice/FakeStoreSlice'

export const store = configureStore({
    reducer: {
        fakeStore: fakeStoreReducer,
    },
})