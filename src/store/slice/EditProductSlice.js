import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';


export const editData = createAsyncThunk('editProduct/editData', async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(
                {
                    title: 'test product',
                }
            )
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error Editing Data:', error);
        throw error;
    }
})

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

    },
    extraReducers: (builder) => {
        builder
            .addCase(editData.fulfilled, (state, action) => {
                console.log("Edited Successfully");
            })
    },
})


export const { setEditable, setEditableRow, setToEdit } = editProductSlice.actions

export default editProductSlice.reducer