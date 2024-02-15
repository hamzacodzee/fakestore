import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    products: [],
    openEdit: false,
    edit: "",
}

export const addModalSlice = createSlice({
    name: 'addModal',
    initialState,
    reducers: {

        setOpen: (state, action) => {
            state.open = action.payload
        },

        setOpenEdit: (state, action) => {
            state.openEdit = action.payload
        },

        getData: (state, action) => {
            const result = JSON.parse(localStorage.getItem("products"));
            state.products = result || [];
        },

        setEdit: (state, action) => {
            state.edit = action.payload
        },

    },

})


export const { setOpen, getData, setOpenEdit, setEdit } = addModalSlice.actions

export default addModalSlice.reducer