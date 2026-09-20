import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../api/todoApi";

const initialState = {
  token: localStorage.getItem("token") | "",
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("api/auth/login", userData);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Ошибка входа в аккаунт");
    }
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("api/auth/register", userData);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Ошибка регистрации");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, signUp.fulfilled),
      (state, action) => {
        const token = action.payload.access_token;
        localStorage.setItem("token", JSON.stringify(token));
        state.isAuthenticated = true;
      },
    );
  },
});

export default authSlice.reducer;
