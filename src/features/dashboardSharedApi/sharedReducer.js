import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TEACHER , GET_PARENT} from "../../constants/apiConfig";
import { BASE_URL } from "../../constants/apiConfig";

// Common actions for all roles
export const getItem = createAsyncThunk(
    "dashboard/getItem",
    async ({ role }, { rejectWithValue }) => {
        try {
            console.log("Role:", role);

            const token = localStorage.getItem("token"); // Fetch token from storage
            if (!token) {
                return rejectWithValue("Unauthorized - Missing Token");
            }

            let apiEndpoint;
            switch (role) {
                case "teacher":
                    apiEndpoint = "/getTeachers"; // Update endpoint for GET
                    break;
                case "student":
                    apiEndpoint = "/getStudents"; // Update endpoint for GET
                    break;
                case "parent":
                    apiEndpoint = "/getParents"; // Update endpoint for GET
                    break;
                default:
                    return rejectWithValue("Invalid role provided");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Use axios.get for GET API
            const response = await axios.get(`${BASE_URL}${apiEndpoint}`, config);
            console.log("API Response:", response?.data);
            return { role, data: response?.data?.data } // Return the response data
        } catch (error) {
            console.error("API Error:", error.response || error.message || error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

export const addItem = createAsyncThunk(
    "dashboard/addItem",
    async ({ role, payload }, { rejectWithValue, getState }) => {
        localStorage.getItem("token")
        try {

            const token = localStorage.getItem("token"); // Replace with appropriate method
            if (!token) {
                return rejectWithValue("Unauthorized - Missing Token");
            }

            let apiEndpoint;
            switch (role) {
                case "teacher":
                    apiEndpoint = "/addTeacher";
                    break;
                case "student":
                    apiEndpoint = "/addStudent";
                    break;
                case "parent":
                    apiEndpoint = "/addParent";
                    break;
                default:
                    return rejectWithValue("Invalid role provided");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(`${BASE_URL}${apiEndpoint}`, payload, config);
            return { role, data: response?.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add failed");
        }
    }
);


export const editItem = createAsyncThunk(
    "dashboard/editItem",
    async ({ role, id, payload }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/${role}/edit/${id}`, payload);
            return { role, data: response?.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

export const deleteItem = createAsyncThunk(
    "dashboard/deleteItem",
    async ({ role, id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token"); // Replace with appropriate method
            if (!token) {
                return rejectWithValue("Unauthorized - Missing Token");
            }
            let apiEndpoint;
            switch (role) {
                case "teacher":
                    apiEndpoint = "/deleteTeacher";
                    break;
                case "student":
                    apiEndpoint = "/deleteStudent";
                    break;
                case "parent":
                    apiEndpoint = "/deleteParent";
                    break;
                default:
                    return rejectWithValue("Invalid role provided");
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(`${BASE_URL}/${apiEndpoint}/${id}`, config);
            return { role, data: response?.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const sharedReducer = createSlice({
    name: "sharedApi",
    initialState: {
        data: [],
        teacherData: [],
        studentData: [],
        parentData: [],
        loading: false,
        error: null,
        shouldReloadTeacherData: false,
        shouldReloadStudentData: false,
        shouldReloadParentData: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Items
            .addCase(getItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getItem.fulfilled, (state, action) => {  // action is now correctly passed
                state.loading = false;
                state.data = action.payload;  // action.payload contains the response data
                const { role, data } = action.payload;

                if (role === "teacher") state.teacherData = data;
                if (role === "student") state.studentData = data;
                if (role === "parent") state.parentData = data;
            })
            .addCase(getItem.rejected, (state, action) => {  // action is passed here as well
                state.loading = false;
                state.error = action.payload;
            })
            // Add Items
            .addCase(addItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                const { role, data } = action.payload;

                if (role === "teacher") {
                    state.shouldReloadTeacherData = !state.shouldReloadTeacherData;
                } else if (role === "student") {
                    state.shouldReloadStudentData = !state.shouldReloadStudentData;
                } else if (role === "parent") {
                    state.shouldReloadParentData = !state.shouldReloadParentData;
                }
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Items
            .addCase(editItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editItem.fulfilled, (state, action) => {
                state.loading = false;
                // const index = state.data.findIndex((item) => item.id === action.payload.id);
                // if (index !== -1) state.data[index] = action.payload;
                const { role, data } = action.payload;

                if (role === "teacher") {
                    state.shouldReloadTeacherData = !state.shouldReloadTeacherData;
                } else if (role === "student") {
                    state.shouldReloadStudentData = !state.shouldReloadStudentData;
                } else if (role === "parent") {
                    state.shouldReloadParentData = !state.shouldReloadParentData;
                }
            })
            .addCase(editItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Items
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                
                const { role, data } = action.payload;

                if (role === "teacher") state.shouldReloadTeacherData = !state.shouldReloadTeacherData;
                if (role === "student") state.shouldReloadStudentData = !state.shouldReloadStudentData;
                if (role === "parent") state.shouldReloadParentData = !state.shouldReloadParentData;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sharedReducer.reducer;

