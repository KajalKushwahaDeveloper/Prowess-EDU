import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { S_D_GET_FEEDBACK_FOR_STUDENT, S_D_ADD_FEEDBACK_FOR_STUDENT,S_D_GET_TEACHER_FOR_STUDENT } from "../../constants/apiConfig";

// get feedback api 
export const getFeedbackForStudent = createAsyncThunk(
    "dashboard/getFeedbackForStudent",
    async (classId, { rejectWithValue }) => {
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
            console.log("classIdAssign:", classId);

            const response = await axios.get(`${S_D_GET_FEEDBACK_FOR_STUDENT}?Class=${classId}`, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// get TestQsnsForStudent
export const addFeedback = createAsyncThunk(
    "dashboard/addFeedback",
    async ({payload}, { rejectWithValue }) => {
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

            const response = await axios.post(S_D_ADD_FEEDBACK_FOR_STUDENT, payload, config);

            return response?.data || []; 
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

export const getTeachersForStudent = createAsyncThunk(
    "dashboard/getTeachersForStudent",
    async (classId, { rejectWithValue }) => {
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
            console.log("classIdAssign:", classId);

            const response = await axios.get(S_D_GET_TEACHER_FOR_STUDENT, config);

            // Return only the teachers array
            return response?.data?.data?.teachers || [];
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);


const sharedStudentDashboardFaqbackReducer = createSlice({
    name: "studentDashboardFaqbackSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // post addFeedback
            .addCase(addFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getFeedbackForStudent
            .addCase(getFeedbackForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeedbackForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getFeedbackForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //getTeachersForStudent
            .addCase(getTeachersForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeachersForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getTeachersForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default sharedStudentDashboardFaqbackReducer.reducer;

