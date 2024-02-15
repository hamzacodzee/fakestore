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
            const result = localStorage.getItem("products");
            state.products = JSON.parse(result) || [];
        },


    },

})


export const { setOpen,getData } = addModalSlice.actions

export default addModalSlice.reducer