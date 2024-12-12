import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { S_D_GET_NEW_ASIGN_FOR_STUDENT, S_D_GET_ASSIGN_QSNS_FOR_STUDENT, S_D_GET_NEW_TEST_FOR_STUDENT, S_D_GET_TEST_QSNS_FOR_STUDENT, S_D_GET_ONLINE_CLASSES_FOR_STUDENT ,S_D_UPDATE_ONLINE_CLASSES_FOR_STUDENT} from "../../constants/apiConfig";

// getVideosForTeacher
export const getVideosForTeacher = createAsyncThunk(
    "dashboard/getVideosForTeacher",
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
  
  const sharedTeacherDashboardVideosReducer = createSlice({
    name: "teacherDashboardVideosSharedApi",
    initialState: {
      videoData: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // get getNewVideosForStudent
        .addCase(getVideosForTeacher.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getVideosForTeacher.fulfilled, (state, action) => {
          state.loading = false;
          state.videoData = action.payload || [];
          
        })
        .addCase(getVideosForTeacher.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default sharedTeacherDashboardVideosReducer.reducer;
  