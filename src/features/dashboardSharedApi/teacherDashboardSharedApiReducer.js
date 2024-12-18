import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  T_D_GET_ONLINE_CLASSES_FOR_TEACHER, T_D_ADD_ONLINE_CLASSES, T_D_UPDATE_ONLINE_CLASSES, T_D_DELETE_ONLINE_CLASSES} from "../../constants/apiConfig";
import { toast } from "react-toastify";
//get getAssignQsnsForTeacher api
export const getOnlineClassesForTeacher = createAsyncThunk(
    "dashboard/getOnlineClassesForTeacher",
    async ( { rejectWithValue }) => {
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

            const response = await axios.get(T_D_GET_ONLINE_CLASSES_FOR_TEACHER, config);
            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

// post api  
export const addOnlineClass = createAsyncThunk(
    "dashboard/addOnlineClass",
    async ({  payload }, { rejectWithValue }) => {
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
            const response = await axios.post(T_D_ADD_ONLINE_CLASSES, payload, config);
            return response?.data?.data || [];
        } catch (error) {
            if (error?.response?.data) {
                toast.error(`Failed to add class: ${error.response.data.message}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
            console.error("Error during API call:", error?.response?.data || error.message);
        }
        
    }
);

// put api
export const editOnlineClass = createAsyncThunk(
    "dashboard/editOnlineClass",
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
            const response = await axios.put(T_D_UPDATE_ONLINE_CLASSES(id),payload,config);

            return response?.data?.data || []; // Return the updated report data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

// delete api
export const deleteOnlineClass = createAsyncThunk(
    "dashboard/deleteOnlineClass",
    async ({ id }, { rejectWithValue }) => {
        console.log("Received id in thunk:", id); // Check the ID here
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
            const response = await axios.delete(T_D_DELETE_ONLINE_CLASSES(id), config);
            console.log("ID passed to API utility:", response?.data); // Debug log

            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);


const sharedTeacherDashboardOnlineClassReducer = createSlice({
    name: "teacherDashboardOnlineClassSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Get Items
        .addCase(getOnlineClassesForTeacher.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOnlineClassesForTeacher.fulfilled, (state, action) => {  
            state.loading = false;
                state.data = action.payload || [];  
            })
            .addCase(getOnlineClassesForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(addOnlineClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOnlineClass.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addOnlineClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add online class";
            })
            // Edit Items
            .addCase(editOnlineClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editOnlineClass.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editOnlineClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteOnlineClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOnlineClass.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                console.log("state:", state.data);
            })
            .addCase(deleteOnlineClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default sharedTeacherDashboardOnlineClassReducer.reducer;

