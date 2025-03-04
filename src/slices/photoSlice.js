import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { resetMessage } from "./userSlices";

const initialState = {
  photos: [],
  photo: [],
  error: false,
  sucess: false,
  loading: false,
  message: null,
};

//publish user photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    if (data.erros) {
      return thunkAPI.rejectWithValue(data.erros);
    }

    return data
  }
);

export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserphotos(id, token);

    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async(id, token) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token)


    if (data.erros) {
      return thunkAPI.rejectWithValue(data.erros);
    }

    return data
  }
)

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.photos = action.payload
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;

        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id
        })

        state.message = action.payload.message
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
  },
});

export const { reset } = photoSlice.actions;
export default photoSlice.reducer;
