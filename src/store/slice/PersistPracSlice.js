import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    num: 0,
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
