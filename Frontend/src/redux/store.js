import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./slices/tempSlice";

const store = configureStore({
    reducer: {
        temp: tempReducer,
    },
})

export default store;