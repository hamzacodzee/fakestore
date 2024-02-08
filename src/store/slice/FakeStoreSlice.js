import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: []
}

export const fakeStoreSlice = createSlice({
    name: 'fakeStore',
    initialState,
    reducers: {

        setData: (state, action) => {
            state.data = action.payload
        },
    },
})


export const { setData } = fakeStoreSlice.actions

export default fakeStoreSlice.reducer