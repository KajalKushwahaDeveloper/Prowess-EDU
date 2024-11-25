import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer"
import sharedReducer from "../features/dashboardSharedApi/sharedReducer"
import studentAuthReducer from "../features/auth/studentAuthReducer"
import teacherAuthReducer from "../features/auth/teacherAuthReducer"
import parentAuthReducer from "../features/auth/parentAuthReducer"
import sharedTeacherDashboardReducer from "../features/dashboardSharedApi/teacherSharedreducer"

const rootReducer = combineReducers({
    auth: authReducer,
    sharedApi: sharedReducer,
    studentAuth:studentAuthReducer,
    teacherAuth:teacherAuthReducer,
    parentAuth:parentAuthReducer,
    teacherDashboardSharedApi :sharedTeacherDashboardReducer,
});

export default rootReducer;