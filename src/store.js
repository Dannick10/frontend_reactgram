import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlices'
import userReduce from "./slices/userSlices";
import photoReduce from "./slices/photoSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReduce,
        photo: photoReduce
    },
})