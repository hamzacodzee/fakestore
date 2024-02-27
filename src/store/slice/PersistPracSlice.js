import { createSlice } from '@reduxjs/toolkit';


const persistedValue = sessionStorage.getItem("persist:root");
let initialNum = 0;

if (persistedValue) {
    const parsedValue = JSON.parse(persistedValue);
    initialNum = parseInt(parsedValue.num, 10);
}

const initialState = {
    num: initialNum,
};

export const persistPracSlice = createSlice({
    name: 'persistPrac',
    initialState,
    reducers: {
        setNum: (state, action) => {
            state.num = action.payload;
        },
    },
});

export const { setNum } = persistPracSlice.actions;

export default persistPracSlice.reducer;
