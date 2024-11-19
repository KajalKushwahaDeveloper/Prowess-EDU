import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TEACHER } from "../../constants/apiConfig";
import { BASE_URL } from "../../constants/apiConfig";

// Common actions for all roles
export const getItem = createAsyncThunk(
    "dashboard/getItem",
    async ({ role }, { rejectWithValue }) => {
        try {
            const response = await axios.get(GET);
            return response?.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

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
            return response?.data;
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
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Edit failed");
        }
    }
);

export const deleteItem = createAsyncThunk(
    "dashboard/deleteItem",
    async ({ role, id }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/${role}/delete/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const sharedReducer = createSlice({
    name: "sharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Items
            .addCase(getItem.pending, (state) => {
                state.loading = true,
                    state.error = null;
            })
            .addCase(getItem.fulfilled, (state) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getItem.rejected, (state) => {
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
                state.data.push(action.payload);
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
                const index = state.data.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(editItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // delete Items
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state?.data?.filter((item) => item.id !== action.payload.id);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sharedReducer.reducer;
