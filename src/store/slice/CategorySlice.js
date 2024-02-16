import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    categorys: [],
    openEdit: false,
    edit: "",
    deleteId: "",
    openConfirm: false,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

        setOpen: (state, action) => {
            state.open = action.payload
        },

        setOpenEdit: (state, action) => {
            state.openEdit = action.payload
        },

        getData: (state, action) => {
            const result = JSON.parse(localStorage.getItem("categorys"));
            state.categorys = result || [];
        },

        setEdit: (state, action) => {
            state.edit = action.payload
        },
        setDelete: (state, action) => {
            state.deleteId = action.payload
        },

        setOpenConfirm: (state, action) => {
            state.openConfirm = action.payload
        },
    },

})


export const { setOpen, getData, setOpenEdit, setEdit, setDelete, setOpenConfirm } = categorySlice.actions

export default categorySlice.reducer