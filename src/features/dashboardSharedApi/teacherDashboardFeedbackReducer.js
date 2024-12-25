import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { T_D_GET_FEEDBACK_FOR_TEACHER } from "../../constants/apiConfig";

// get feedback api 
export const getFeedbackForTeacher = createAsyncThunk(
    "dashboard/getFeedbackForTeacher",
    async (_, { rejectWithValue }) => { // Corrected the argument structure
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Unauthorized - Missing Token");
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(T_D_GET_FEEDBACK_FOR_TEACHER, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);




const sharedTeacherDashboardFeedbackbackReducer = createSlice({
    name: "teacherDashboardFeedbackbackSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
      
            // getFeedbackForTeacher
            .addCase(getFeedbackForTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeedbackForTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getFeedbackForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
          
    }
});

export default sharedTeacherDashboardFeedbackbackReducer.reducer;

