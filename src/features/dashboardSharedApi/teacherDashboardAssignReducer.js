import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { T_D_GET_ASIGNMENT_FOR_TEACHER, T_D_GET_ASSIGN_QSNS_FOR_TEACHER, T_D_ADD_ASSIGNMENT, T_D_EDIT_ASSIGNMENT, T_D_DELETE_ASSIGNMENT, T_D_ADD_ASSIGN_QNSN, T_D_EDIT_ASSIGN_QNSN, T_D_DELETE_ASSIGN_QNSN} from "../../constants/apiConfig";

// get api
export const getAssignForTeacher = createAsyncThunk(
    "dashboard/getAssignForTeacher",
    async (_, { rejectWithValue }) => {
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

            const response = await axios.get(T_D_GET_ASIGNMENT_FOR_TEACHER, config);
            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);


// post api  
export const addAssign = createAsyncThunk(
    "dashboard/addAssign",
    async ({ payload }, { rejectWithValue }) => {
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
            const response = await axios.post(T_D_ADD_ASSIGNMENT, payload, config);
            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add assignment");
        }
    }
);


// put api
export const editAssign = createAsyncThunk(
    "dashboard/editAssign",
    async ({ role, id, payload }, { rejectWithValue }) => {
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
            const response = await axios.put(T_D_EDIT_ASSIGNMENT(id),payload,config);

            return response?.data?.data || []; // Return the updated report data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

// delete api
export const deleteAssign = createAsyncThunk(
    "dashboard/deleteAssign",
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
            const response = await axios.delete(T_D_DELETE_ASSIGNMENT(id), config);
            console.log("ID passed to API utility:", response?.data); // Debug log

            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

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
            const response = await axios.post(T_D_ADD_ASSIGN_QNSN(id), payload, config);
            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add assignment");
        }
    }
);


// put api
export const editAssignQsn = createAsyncThunk(
    "dashboard/editAssignQsn",
    async ({ role, id, payload }, { rejectWithValue }) => {
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

const sharedTeacherDashboardAssignReducer = createSlice({
    name: "teacherDashboardAssignSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Get Items
        .addCase(getAssignForTeacher.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAssignForTeacher.fulfilled, (state, action) => {  
            state.loading = false;
                state.data = action.payload || [];  
            })
            .addCase(getAssignForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(addAssign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAssign.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addAssign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Items
            .addCase(editAssign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editAssign.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editAssign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteAssign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAssign.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                console.log("state:", state.data);
            })
            .addCase(deleteAssign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default sharedTeacherDashboardAssignReducer.reducer;

