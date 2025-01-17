import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_LOGIN } from "../../constants/apiConfig";

export const login = createAsyncThunk(
  'auth/login', //action type
  async (payload, { rejectWithValue }) => {
    try {
      // Make API request
      const response = await axios.post(
        ADMIN_LOGIN,
        payload
      );
      console.log("response:", response?.data);

      return response?.data; // Return the API response data
    } catch (error) {
      // Handle errors and reject with value
      console.error("API Error:", error?.response?.data?.message); // Log the error
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const addProfileImg = createAsyncThunk(
  'auth/addProfileImg', //action type
  async (payload, { rejectWithValue }) => {
    try {
      // Make API request
      const response = await axios.post(
        ADMIN_LOGIN,
        payload
      );
      console.log("response:", response?.data);

      return response?.data; // Return the API response data
    } catch (error) {
      // Handle errors and reject with value
      console.error("API Error:", error?.response?.data?.message); // Log the error
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
const authReducer = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Ensure this stores the API response
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message if the API call fails
      })
      // addProfileImg
      .addCase(addProfileImg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfileImg.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Ensure this stores the API response
      })
      .addCase(addProfileImg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message if the API call fails
      });
  }
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;