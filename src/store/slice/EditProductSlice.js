import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const editData = createAsyncThunk('editProduct/editData', async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "POST",
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

}

export const editProductSlice = createSlice({
    name: 'editProduct',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(editData.fulfilled, (state, action) => {
                console.log("Edited Successfully");
            })
    },
})


// export const { } = editProductSlice.actions

export default editProductSlice.reducer