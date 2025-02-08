import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    sucess: false,
    loading: false,
    message: null
}

export const profile = createAsyncThunk(
    "user/profile",
    async(user,thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token 

        const data = await userService.profile(user, token)

        return data
    }
)

export const updateProfile = createAsyncThunk(
  "user/update",
  async(user,thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token 

    const data = await userService.updateProfile(user, token )

    if(data.erros) {
      return thunkAPI.rejectWithValue(data.erros[0])
    }

    return data

  }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuario atualizado com sucesso"
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = {};
        localStorage.removeItem("user");
      })
    } 
})


export const { resetMessage} = userSlice.actions
export default userSlice.reducer