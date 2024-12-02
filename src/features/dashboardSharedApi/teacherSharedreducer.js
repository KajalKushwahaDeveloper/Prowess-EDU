import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { T_D_GET_REPORT_FOR_TEACHER, T_D_EDIT_REPORT,T_D_DELETE_REPORT ,T_D_CREATE_REPORT} from "../../constants/apiConfig";

// get api
export const getReportsForTeacher = createAsyncThunk(
    "dashboard/getReportsForTeacher",
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

            const response = await axios.get(T_D_GET_REPORT_FOR_TEACHER, config);
            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// post api
export const createReport = createAsyncThunk(
    "dashboard/createReport",
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
            const response = await axios.post(T_D_CREATE_REPORT, payload, config);
            return  response?.data 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add failed");
        }
    }
);
  
// put api
export const editReport = createAsyncThunk(
    "dashboard/editReport",
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
            const response = await axios.put(T_D_EDIT_REPORT(id),payload,config);

            return {data:response?.data} // Return the updated report data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

// delete api
export const deleteReport = createAsyncThunk(
    "dashboard/deleteReport",
    async ({ id }, { rejectWithValue }) => {
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
            const response = await axios.delete(T_D_DELETE_REPORT(id), config);
            return {data:response?.data} 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const sharedTeacherDashboardReducer = createSlice({
    name: "teacherDashboardSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Items
            .addCase(getReportsForTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReportsForTeacher.fulfilled, (state, action) => {  
                state.loading = false;
                state.data = action.payload || [];  
                console.log("state:", state.data);
                
            })
            .addCase(getReportsForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(createReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Items
            .addCase(editReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editReport.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                
            })
            .addCase(deleteReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sharedTeacherDashboardReducer.reducer;

