import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchData = createAsyncThunk('fakeStore/fetchData', async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        //search

        const formattedData = jsonData.map(
            ({ image, title, price, category }) => ({
                image,
                title,
                price,
                category,
            })
        );
        return formattedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
})

const initialState = {
    data: [],
    itemsPerPage: 6,
    page: 1,
    load: true,
    categoryList: [],
    categoryData: [],
    searching: "",
    category: "",
    copyList: []
}

export const fakeStoreSlice = createSlice({
    name: 'fakeStore',
    initialState,
    reducers: {

        setData: (state, action) => {
            state.data = action.payload
        },

        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        setLoad: (state, action) => {
            state.load = action.payload
        },

        setCategoryList: (state, action) => {
            state.categoryList = action.payload
        },

        setCategoryData: (state, action) => {
            state.categoryData = action.payload
        },

        setSearching: (state, action) => {
            state.searching = action.payload
        },

        setCategory: (state, action) => {
            state.category = action.payload
        },

        setCopyList: (state, action) => {
            state.copyList = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    },
})


export const { setData, setCopyList, setSearching, setCategory, setItemsPerPage, setPage, setLoad, setCategoryList, setCategoryData } = fakeStoreSlice.actions

export default fakeStoreSlice.reducer