import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  T_D_GET_ASSIGN_QSNS_FOR_TEACHER, T_D_ADD_ASSIGN_QNSN, T_D_EDIT_ASSIGN_QNSN, T_D_DELETE_ASSIGN_QNSN} from "../../constants/apiConfig";

//get getAssignQsnsForTeacher api
export const getAssignQnsnForTeacher = createAsyncThunk(
    "dashboard/getAssignQnsnForTeacher",
    async ({assignmentId}, { rejectWithValue }) => {
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

            const response = await axios.get(`${T_D_GET_ASSIGN_QSNS_FOR_TEACHER}?assignmentId=${assignmentId}`, config);
            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// post api  
export const addAssignQsn = createAsyncThunk(
    "dashboard/addAssignQsn",
    async ({ assignmentId, payload }, { rejectWithValue }) => {
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
            const response = await axios.post(`${T_D_ADD_ASSIGN_QNSN}?assignmentId=${assignmentId}`, payload, config);
            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add assignment");
        }
    }
);

// put api
export const editAssignQsn = createAsyncThunk(
    "dashboard/editAssignQsn",
    async ({ id, payload }, { rejectWithValue }) => {
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
            // Change DELETE to PUT for editing reports
            const response = await axios.put(T_D_EDIT_ASSIGN_QNSN(id),payload,config);

            return response?.data?.data || []; // Return the updated report data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

// delete api
export const deleteAssignQsn = createAsyncThunk(
    "dashboard/deleteAssignQsn",
    async ({ id }, { rejectWithValue }) => {
        console.log("Received id in thunk:", id);
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
            const response = await axios.delete(T_D_DELETE_ASSIGN_QNSN(id), config);
            console.log("ID passed to API utility:", response?.data); // Debug log

            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const sharedTeacherDashboardAssignQsnReducer = createSlice({
    name: "teacherDashboardAssignQsnSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Get Items
        .addCase(getAssignQnsnForTeacher.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAssignQnsnForTeacher.fulfilled, (state, action) => {  
            state.loading = false;
                state.data = action.payload || [];  
            })
            .addCase(getAssignQnsnForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(addAssignQsn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAssignQsn.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addAssignQsn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Items
            .addCase(editAssignQsn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editAssignQsn.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editAssignQsn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteAssignQsn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAssignQsn.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                console.log("state:", state.data);
            })
            .addCase(deleteAssignQsn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default sharedTeacherDashboardAssignQsnReducer.reducer;

