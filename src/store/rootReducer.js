import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer"
import sharedReducer from "../features/dashboardSharedApi/sharedReducer"
import studentAuthReducer from "../features/auth/studentAuthReducer"
import teacherAuthReducer from "../features/auth/teacherAuthReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    sharedApi: sharedReducer,
    studentAuth:studentAuthReducer,
    teacherAuth:teacherAuthReducer,

});

export default rootReducer;