import { configureStore } from '@reduxjs/toolkit'
import fakeStoreReducer from './slice/FakeStoreSlice'
import viewProductReducer from './slice/ViewProductSlice'
import addModalReducer from './slice/AddModalSlice'
import categoryReducer from './slice/CategorySlice'
import eventReducer from './slice/EventSlice'


export const store = configureStore({
    reducer: {
        fakeStore: fakeStoreReducer,
        viewProduct: viewProductReducer,
        addModal: addModalReducer,
        category: categoryReducer,
        event: eventReducer,
    },
})