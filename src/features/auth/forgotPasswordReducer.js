import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FORGOT_PASSWORD, VERIFY_OTP, RESET_PASSWORD} from "../../constants/apiConfig";

// Common actions for all roles
export const forgot_password = createAsyncThunk(
  "dashboard/forgot_password",
  async ({ role, payload }, { rejectWithValue }) => {
    localStorage.getItem("token");
    try {
      const token = localStorage.getItem("token"); // Replace with appropriate method
      // if (!token) {
      //   return rejectWithValue("Unauthorized - Missing Token");
      // }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${FORGOT_PASSWORD}?role=${role}`,
        payload,
        config
      );
      return { role, data: response?.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "failed");
    }
  }
);
//verify_otp
export const verify_otp = createAsyncThunk(
  "dashboard/verify_otp",
  async ({ role, payload }, { rejectWithValue }) => {
    localStorage.getItem("token");
    try {
      const token = localStorage.getItem("token"); // Replace with appropriate method
      // if (!token) {
      //   return rejectWithValue("Unauthorized - Missing Token");
      // }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${VERIFY_OTP}?role=${role}`,
        payload,
        config
      );
      return { role, data: response?.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "failed");
    }
  }
);
//resetPassword
export const reset_password = createAsyncThunk(
  "dashboard/reset_password",
  async ({ role, payload }, { rejectWithValue }) => {
    localStorage.getItem("token");
    try {
      const token = localStorage.getItem("token"); // Replace with appropriate method
      // if (!token) {
      //   return rejectWithValue("Unauthorized - Missing Token");
      // }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${RESET_PASSWORD}?role=${role}`,
        payload,
        config
      );
      return { role, data: response?.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "failed");
    }
  }
);
const passwordSharedReducer = createSlice({
  name: "passwordSharedApi",
  initialState: {
    data: [],
    teacherData: [],
    studentData: [],
    parentData: [],
    loading: false,
    error: null,
    shouldReloadAdminData: false,
    shouldReloadTeacherData: false,
    shouldReloadStudentData: false,
    shouldReloadParentData: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //forgot_password
      .addCase(forgot_password.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgot_password.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        const { role } = action.payload;

        if (role === "teacher") {
          state.shouldReloadTeacherData = !state.shouldReloadTeacherData;
        } else if (role === "student") {
          state.shouldReloadStudentData = !state.shouldReloadStudentData;
        } else if (role === "admin") {
          state.shouldReloadAdminData = !state.shouldReloadAdminData;
        } else if (role === "parent") {
          state.shouldReloadParentData = !state.shouldReloadParentData;
        }
      })
      .addCase(forgot_password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //verify_otp
      .addCase(verify_otp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify_otp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verify_otp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //reset password
      .addCase(reset_password.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default passwordSharedReducer.reducer;
