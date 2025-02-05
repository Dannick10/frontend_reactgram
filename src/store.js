import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlices'
import userReduce from "./slices/userSlices";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReduce
    },
})