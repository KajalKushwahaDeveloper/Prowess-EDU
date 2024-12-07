import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { T_D_PRESIGNED_URL, T_D_GET_VIDEO_FOR_TEACHER, T_D_EDIT_VIDEO, T_D_DELETE_VIDEO, T_D_ADD_VIDEO} from "../../constants/apiConfig";

// Async thunk to get presigned URL
export const fetchPresignedUrl = createAsyncThunk(
  'video/fetchPresignedUrl',
  async ({ fileName, fileType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(T_D_PRESIGNED_URL, {
        fileName,
        fileType
      });
      return response.data.data.presignedUrl; // return the presigned URL
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add video to the server after upload
export const addVideo = createAsyncThunk(
  'video/addVideo',
  async (videoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(T_D_ADD_VIDEO, videoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teacherDashboardVideoSharedApi = createSlice({
  name: 'videosSharedApi',
  initialState: {
    presignedUrl: null,
    loading: false,
    error: null,
    videoData: null,
  },
  
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchPresignedUrl.fulfilled, (state, action) => {
      state.loading = false;
      state.presignedUrl = action.payload; // action.payload must contain the presigned URL
    })
    
      .addCase(fetchPresignedUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.presignedUrl = action.payload;
      })
      .addCase(fetchPresignedUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videoData = action.payload;
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teacherDashboardVideoSharedApi.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { T_D_GET_VIDEO_FOR_TEACHER, T_D_EDIT_VIDEO,T_D_DELETE_VIDEO ,T_D_ADD_VIDEO} from "../../constants/apiConfig";

// // get api
// export const getVideosForTeacher = createAsyncThunk(
//     "dashboard/getVideosForTeacher",
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token"); // Corrected token retrieval
//             if (!token) {
//                 return rejectWithValue("Unauthorized - Missing Token");
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const response = await axios.get(T_D_GET_VIDEO_FOR_TEACHER, config);
//             return response?.data?.data || []; // Safeguard for undefined data
//         } catch (error) {
//             console.error("API Error:", error);
//             return rejectWithValue(error.response?.data?.message || "Get failed");
//         }
//     }
// );

// // post api
// export const addVideo = createAsyncThunk(
//     "dashboard/addVideo",
//     async ({ id, payload }, { rejectWithValue }) => {
        
//         try {

//             const token = localStorage.getItem("token"); 
//             if (!token) {
//                 return rejectWithValue("Unauthorized - Missing Token");
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const response = await axios.post(T_D_ADD_VIDEO, payload, config);
//             return  response?.data 
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Add failed");
//         }
//     }
// );
  
// // put api
// export const editVideo = createAsyncThunk(
//     "dashboard/editVideo",
//     async ({ role, id, payload }, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token"); 
//             if (!token) {
//                 return rejectWithValue("Unauthorized - Missing Token");
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             // Change DELETE to PUT for editing VIDEOs
//             const response = await axios.put(T_D_EDIT_VIDEO(id),payload,config);

//             return {data:response?.data} // Return the updated VIDEO data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Edit failed");
//         }
//     }
// );

// // delete api
// export const deleteVideo = createAsyncThunk(
//     "dashboard/deleteVideo",
//     async ({ id }, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token"); 
//             if (!token) {
//                 return rejectWithValue("Unauthorized - Missing Token");
//             }
           
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const response = await axios.delete(T_D_DELETE_VIDEO(id), config);
//             return {data:response?.data} 
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Delete failed");
//         }
//     }
// );

// const sharedTeacherDashboardVideoReducer = createSlice({
//     name: "teacherDashboardVideoSharedApi",
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Get Items
//             .addCase(getVideosForTeacher.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getVideosForTeacher.fulfilled, (state, action) => {  
//                 state.loading = false;
//                 state.data = action.payload || [];  
//                 console.log("state:", state.data);
                
//             })
//             .addCase(getVideosForTeacher.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             // Add Items
//             .addCase(addVideo.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addVideo.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(addVideo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             // Edit Items
//             .addCase(editVideo.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(editVideo.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // const index = state.data.findIndex((item) => item.id === action.payload.id);
//                 // if (index !== -1) state.data[index] = action.payload;
//             })
//             .addCase(editVideo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             // Delete Items
//             .addCase(deleteVideo.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteVideo.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // state.data = state?.data?.filter((item) => item.id !== action.payload.id);
                
//             })
//             .addCase(deleteVideo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export default sharedTeacherDashboardVideoReducer.reducer;

