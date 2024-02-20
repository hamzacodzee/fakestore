import { createSlice, } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';


const initialState = {
    editable: false,
    editableRow: "",
    toEdit: "",
}

export const editProductSlice = createSlice({
    name: 'editProduct',
    initialState,
    reducers: {
        setEditable: (state, action) => {
            state.editable = action.payload
        },
        setEditableRow: (state, action) => {
            state.editableRow = action.payload
        },

        setToEdit: (state, action) => {
            state.toEdit = action.payload
            const { id, title, price } = state.toEdit
            const existingData = JSON.parse(localStorage.getItem("allProducts"));
            existingData[id].title = title;
            existingData[id].price = price;
            localStorage.setItem("allProducts", JSON.stringify(existingData));
            toast.success("Edited Successfully!")
        },

    }
})


export const { setEditable, setEditableRow, setToEdit } = editProductSlice.actions

export default editProductSlice.reducer