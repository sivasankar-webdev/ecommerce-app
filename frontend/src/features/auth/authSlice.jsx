import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import Cookies from "js-cookie";

// REGISTER
export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        // Save to storage
        localStorage.setItem("token", action.payload.token);
        Cookies.set("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        // Save token
        localStorage.setItem("token", action.payload.token);
        Cookies.set("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;