import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_CLASS_SECTION, ADD_CLASS_SECTION } from "../../constants/apiConfig";

// faq get api
export const getClassSection= createAsyncThunk(
    "dashboard/getClassSection",
    async (classId, { rejectWithValue }) => {
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
            console.log("classIdAssign:", classId);

            const response = await axios.get(GET_CLASS_SECTION, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);
// faq post api
export const addClassSection = createAsyncThunk(
    "dashboard/addClassSection",
    async ({ payload }, { rejectWithValue }) => { // Accept the payload as a parameter
      try {
        const token = localStorage.getItem("token"); // Corrected token retrieval
        if (!token) {
          return rejectWithValue("Unauthorized - Missing Token");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure the Content-Type is set correctly
          },
        };
  
        // Send the payload as the request body
        const response = await axios.post(ADD_CLASS_SECTION, payload, config);
  
        return response?.data || []; // Safeguard for undefined data
      } catch (error) {
        console.error("API Error:", error);
        return rejectWithValue(error.response?.data?.message || "Get failed");
      }
    }
  );
  
const sharedClassSectionReducer = createSlice({
    name: "classSectionSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get get Faqs ForStudent
            .addCase(getClassSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassSection.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
                console.log("getClassSectionstate:", state);
                
            })
            .addCase(getClassSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // post addFaq
            .addCase(addClassSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addClassSection.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(addClassSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export default sharedClassSectionReducer.reducer;

