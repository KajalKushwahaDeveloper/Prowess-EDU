import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  LOGIN_STUDENT } from "../../constants/apiConfig";

export const studentLogin = createAsyncThunk(
  'studentAuth/studentLogin', //action type
  async (payload, { rejectWithValue }) => {
    try {
      // Make API request
      const response = await axios.post(
        LOGIN_STUDENT,
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

const studentAuthReducer = createSlice({
  name: 'studentAuth',
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
      .addCase(studentLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Ensure this stores the API response
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message if the API call fails
      });

  }
});

export const { logout } = studentAuthReducer.actions;

export default studentAuthReducer.reducer;