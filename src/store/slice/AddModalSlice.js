import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    products: [],
}

export const addModalSlice = createSlice({
    name: 'addModal',
    initialState,
    reducers: {

        setOpen: (state, action) => {
            state.open = action.payload
        },

        getData: (state, action) => {
            const result = JSON.parse(localStorage.getItem("products"));
            state.products = result || [];
        },


    },

})


export const { setOpen, getData } = addModalSlice.actions

export default addModalSlice.reducer