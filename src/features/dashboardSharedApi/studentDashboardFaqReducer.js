import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { S_D_GET_FAQ_FOR_STUDENT, S_D_ADD_FAQ_FOR_STUDENT } from "../../constants/apiConfig";

// faq get api
export const getFaqsForStudent = createAsyncThunk(
    "dashboard/getFaqsForStudent",
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

            const response = await axios.get(`${S_D_GET_FAQ_FOR_STUDENT}?Class=${classId}`, config);

            return response?.data?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);
// faq post api
export const addFaq = createAsyncThunk(
    "dashboard/addFaq",
    async ({  }, { rejectWithValue }) => {
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

            const response = await axios.post(S_D_ADD_FAQ_FOR_STUDENT, config);

            return response?.data || []; // Safeguard for undefined data
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Get failed");
        }
    }
);

const sharedStudentDashboardFaqReducer = createSlice({
    name: "studentDashboardFaqSharedApi",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get get Faqs ForStudent
            .addCase(getFaqsForStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFaqsForStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
                console.log("getFaqsForStudentstate:", state);
                
            })
            .addCase(getFaqsForStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // post addFaq
            .addCase(addFaq.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFaq.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(addFaq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export default sharedStudentDashboardFaqReducer.reducer;

