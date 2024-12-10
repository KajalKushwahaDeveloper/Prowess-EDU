import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { S_D_GET_NEW_VIDEOS_FOR_STUDENT } from "../../constants/apiConfig";

// get api
export const getNewVideosForStudent = createAsyncThunk(
  "dashboard/getNewVideosForStudent",
  async ({ classId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Corrected token retrieval
      if (!token) {
        return rejectWithValue("Unauthorized - Missing Token");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("classId:", classId);

      const response = await axios.get(
        `${S_D_GET_NEW_VIDEOS_FOR_STUDENT}?Class=${classId}`,
        config
      );

      return response?.data?.data || []; // Safeguard for undefined data
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Get failed");
    }
  }
);

const sharedStudentDashboardVideosReducer = createSlice({
  name: "studentDashboardNewVideosSharedApi",
  initialState: {
    videoData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get getNewVideosForStudent
      .addCase(getNewVideosForStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewVideosForStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.videoData = action.payload || [];
        
      })
      .addCase(getNewVideosForStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sharedStudentDashboardVideosReducer.reducer;
