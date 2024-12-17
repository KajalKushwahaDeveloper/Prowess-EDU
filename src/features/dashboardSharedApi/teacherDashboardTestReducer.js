import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { T_D_GET_TEST_FOR_TEACHER, T_D_ADD_TEST, T_D_EDIT_TEST, T_D_DELETE_TEST } from "../../constants/apiConfig";

// get api
export const getTestForTeacher = createAsyncThunk(
    "dashboard/getTestForTeacher",
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

            const response = await axios.get(T_D_GET_TEST_FOR_TEACHER, config);
            console.log("getAssignForTeacherResponse:", response);
            
            return response?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);


// post api  
export const addTest = createAsyncThunk(
    "dashboard/addTest",
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
            const response = await axios.post(T_D_ADD_TEST, payload, config);
            return response || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add assignment");
        }
    }
);


// put api
export const editTest = createAsyncThunk(
    "dashboard/editTest",
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
            const response = await axios.put(T_D_EDIT_TEST(id), payload, config);

            return response?.data?.data || []; // Return the updated report data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

// delete api
export const deleteTest = createAsyncThunk(
    "dashboard/deleteTest",
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
            const response = await axios.delete(T_D_DELETE_TEST(id), config);
            console.log("ID passed to API utility:", response?.data); // Debug log

            return response?.data?.data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const sharedTeacherDashboardTestReducer = createSlice({
    name: "teacherDashboardTestSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Items
            .addCase(getTestForTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTestForTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
                console.log("stateAssignment:", state.data)
            })

            .addCase(getTestForTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(addTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTest.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Items
            .addCase(editTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTest.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTest.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                console.log("state:", state.data);
            })
            .addCase(deleteTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default sharedTeacherDashboardTestReducer.reducer;

