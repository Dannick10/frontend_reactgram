import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nullable } from "zod";

const initialState = {
    user: {},
    error: false,
    sucess: false,
    loading: false,
    message: null
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    }
})


export const { resetMessage} = userSlice.actions
export default userSlice.reducer