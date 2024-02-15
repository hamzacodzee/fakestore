import { configureStore } from '@reduxjs/toolkit'
import fakeStoreReducer from './slice/FakeStoreSlice'
import viewProductReducer from './slice/ViewProductSlice'
import addModalReducer from './slice/AddModalSlice'



export const store = configureStore({
    reducer: {
        fakeStore: fakeStoreReducer,
        viewProduct: viewProductReducer,
        addModal: addModalReducer
    },
})