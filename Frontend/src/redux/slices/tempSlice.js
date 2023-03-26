import { createSlice } from "@reduxjs/toolkit";

export const tempSlice = createSlice({
    name: "temp",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    }
});

export const { increment } = tempSlice.actions;

export default tempSlice.reducer;