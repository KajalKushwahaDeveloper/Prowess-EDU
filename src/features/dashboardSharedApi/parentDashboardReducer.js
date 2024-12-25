import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { T_D_GET_CHILD_REPORTS_FOR_PARENT } from "../../constants/apiConfig";

// get feedback api 
export const getChildReportsForParent = createAsyncThunk(
    "dashboard/getChildReportsForParent",
    async (_, { rejectWithValue }) => { // Corrected the argument structure
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

            const response = await axios.get(T_D_GET_CHILD_REPORTS_FOR_PARENT, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);




const sharedParentDashboardReducer = createSlice({
    name: "parentDashboardSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
      
            // getChildReportsForParent
            .addCase(getChildReportsForParent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChildReportsForParent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(getChildReportsForParent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
          
    }
});

export default sharedParentDashboardReducer.reducer;

