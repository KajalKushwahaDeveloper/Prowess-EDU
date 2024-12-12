import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { S_D_GET_NEW_ASIGN_FOR_STUDENT, S_D_GET_ASSIGN_QSNS_FOR_STUDENT, S_D_GET_NEW_TEST_FOR_STUDENT, S_D_GET_TEST_QSNS_FOR_STUDENT, S_D_GET_ONLINE_CLASSES_FOR_STUDENT ,S_D_UPDATE_ONLINE_CLASSES_FOR_STUDENT} from "../../constants/apiConfig";

// get api
export const getNewAssignForStudent = createAsyncThunk(
    "dashboard/getNewAssignForStudent",
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

            const response = await axios.get(`${S_D_GET_NEW_ASIGN_FOR_STUDENT}?Class=${classId}`, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);
// get api
export const getAssignQsnsForStudent = createAsyncThunk(
    "dashboard/getAssignQsnsForStudent",
    async ({ classId, assignmentId }, { rejectWithValue }) => {
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

            const response = await axios.get(`${S_D_GET_ASSIGN_QSNS_FOR_STUDENT}?Class=${classId}&assignmentId=${assignmentId}`, config);

            return response?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// get api test 
export const getNewTestForStudent = createAsyncThunk(
    "dashboard/getNewTestForStudent",
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

            const response = await axios.get(`${S_D_GET_NEW_TEST_FOR_STUDENT}?Class=${classId}`, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// get TestQsnsForStudent
export const getTestQsnsForStudent = createAsyncThunk(
    "dashboard/getTestQsnsForStudent",
    async ({ classId, testId }, { rejectWithValue }) => {
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

            const response = await axios.get(`${S_D_GET_TEST_QSNS_FOR_STUDENT}?Class=${classId}&testId=${testId}`, config);

            return response?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// get OnlineClassesForStudent
export const getOnlineClassesForStudent = createAsyncThunk(
    "dashboard/getOnlineClassesForStudent",
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

            const response = await axios.get(`${S_D_GET_ONLINE_CLASSES_FOR_STUDENT}?Class=${classId}`, config);

            return response?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);
// updateOnlineClassStatus
export const updateOnlineClassStatus = createAsyncThunk(
    "dashboard/updateOnlineClassStatus",
    async ({ onlineClassId , payload}, { rejectWithValue }) => {
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

            const response = await axios.put(`${S_D_UPDATE_ONLINE_CLASSES_FOR_STUDENT}?onlineClassId=${onlineClassId}`,payload, config);

            return response?.data || []; 
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

const sharedStudentDashboardAssignReducer = createSlice({
    name: "studentDashboardNewAssignSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get getNewAssignForStudent
            .addCase(getNewAssignForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewAssignForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getNewAssignForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get getAssignQsnsForStudent
            .addCase(getAssignQsnsForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAssignQsnsForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getAssignQsnsForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getNewTestForStudent
            .addCase(getNewTestForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewTestForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getNewTestForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getOnlineClassesForStudent
            .addCase(getOnlineClassesForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOnlineClassesForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getOnlineClassesForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateOnlineClassStatus
            .addCase(updateOnlineClassStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOnlineClassStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(updateOnlineClassStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default sharedStudentDashboardAssignReducer.reducer;

