import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ?? null,
  error: null,
  sucess: false,
  loading: false,
};

//register an user and sign in

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {

        const data = await authService.register(user);
        
        //check for erros
        if (data.erros) {
            console.log(data);
            return thunkAPI.rejectWithValue(data.erros[0]);
        }
        
        return data;
    } catch {
        return thunkAPI.rejectWithValue("Erro ao fazer registro, tente novamente.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const data = await authService.login(user);

    if (data.erros) {
      return thunkAPI.rejectWithValue(data.erros[0]); // Retorna o erro correto
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Erro ao fazer login, tente novamente.");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.sucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.sucess = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
