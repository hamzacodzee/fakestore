import { configureStore } from '@reduxjs/toolkit'
import fakeStoreReducer from './slice/FakeStoreSlice'
import viewProductReducer from './slice/ViewProductSlice'
import addModalReducer from './slice/AddModalSlice'
import categoryReducer from './slice/CategorySlice'
import eventReducer from './slice/EventSlice'
import editProductReducer from './slice/EditProductSlice'
import persistPracReducer from './slice/PersistPracSlice'
import { persistReducer, persistStore } from 'redux-persist';
// eslint-disable-next-line 
import { thunk } from 'redux-thunk';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, persistPracReducer)


export const store = configureStore({
    reducer: {
        fakeStore: fakeStoreReducer,
        viewProduct: viewProductReducer,
        addModal: addModalReducer,
        category: categoryReducer,
        event: eventReducer,
        editProduct: editProductReducer,
        persistPrac: persistedReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const persist_store = persistStore(store)

export {persist_store};