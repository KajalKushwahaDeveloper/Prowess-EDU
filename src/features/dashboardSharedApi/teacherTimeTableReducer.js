import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { T_D_GET_TIME_TABLE_FOR_TEACHER, T_D_UPDATE_TIME_TABLE, T_D_DELETE_TIME_TABLE, T_D_ADD_TIME_TABLE} from "../../constants/apiConfig";

// get api
export const getTimeTableForTeacher = createAsyncThunk(
    "dashboard/getTimeTableForTeacher",
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
            const response = await axios.get(T_D_GET_TIME_TABLE_FOR_TEACHER, config);
            return response?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// post api
export const addTimeTable  = createAsyncThunk(
    "dashboard/addTimeTable ",
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
            const response = await axios.post(T_D_ADD_TIME_TABLE, payload, config);
            return  response?.data 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add failed");
        }
    }
);
  
// put api
export const editTimeTable = createAsyncThunk(
    "dashboard/editTimeTable",
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
            const response = await axios.put(T_D_UPDATE_TIME_TABLE( id),payload,config);

            return {data:response?.data} // Return the updated report data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

// delete api
export const deleteTimeTable = createAsyncThunk(
    "dashboard/deleteTimeTable",
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
            const response = await axios.delete(T_D_DELETE_TIME_TABLE(id), config);
            return {data:response?.data} 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const sharedTeacherTimeTableReducer = createSlice({
    name: "teacherDashboardTimeTableSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Items
            .addCase(getTimeTableForTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTimeTableForTeacher.fulfilled, (state, action) => {  
                state.loading = false;
                state.data = action.payload || [];  
                console.log("state:", state.data);
                
            })
            .addCase(getTimeTableForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(addTimeTable .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTimeTable .fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addTimeTable .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Items
            .addCase(editTimeTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTimeTable.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editTimeTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteTimeTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTimeTable.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                
            })
            .addCase(deleteTimeTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sharedTeacherTimeTableReducer.reducer;

