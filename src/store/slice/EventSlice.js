import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    events: [],
    openEdit: false,
    edit: "",
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {

        setOpen: (state, action) => {
            state.open = action.payload
        },

        setOpenEdit: (state, action) => {
            state.openEdit = action.payload
        },

        getData: (state, action) => {
            const result = JSON.parse(localStorage.getItem("events"));
            state.events = result || [];
        },

        setEdit: (state, action) => {
            state.edit = action.payload
        },

    },

})


export const { setOpen, getData, setOpenEdit, setEdit } = eventSlice.actions

export default eventSlice.reducer