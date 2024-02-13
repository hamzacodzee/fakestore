import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchProduct = createAsyncThunk('fetchProduct', async (id, { dispatch, getState }) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        return data
    }
    catch (e) {
        console.error(e)
        throw e
    }
})

//do not forget export
export const viewProductSlice = createSlice({
    name: 'viewProduct',
    initialState: {
        status: "idle",
        product: null,
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.product = action.payload;
                console.log('Fetched Product:', action.payload);
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'error';
                console.error('Rejected Fetch Product');
            });
    }
})

export default viewProductSlice.reducer