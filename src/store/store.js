import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import fakeStoreReducer from './slice/FakeStoreSlice';
import viewProductReducer from './slice/ViewProductSlice';
import addModalReducer from './slice/AddModalSlice';
import categoryReducer from './slice/CategorySlice';
import eventReducer from './slice/EventSlice';
import editProductReducer from './slice/EditProductSlice';
import persistPracReducer from './slice/PersistPracSlice';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['persistPrac'],
};

const rootReducer = combineReducers({
    fakeStore: fakeStoreReducer,
    viewProduct: viewProductReducer,
    addModal: addModalReducer,
    category: categoryReducer,
    event: eventReducer,
    editProduct: editProductReducer,
    persistPrac: persistPracReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persist_store = persistStore(store);
