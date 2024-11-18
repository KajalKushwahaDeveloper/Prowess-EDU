import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer"
import sharedReducer from "../features/dashboardSharedApi/sharedReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    sharedApi: sharedReducer,
});

export default rootReducer;