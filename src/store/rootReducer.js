import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authReducer"
import sharedReducer from "../features/dashboardSharedApi/sharedReducer"
import studentAuthReducer from "../features/auth/studentAuthReducer"
import teacherAuthReducer from "../features/auth/teacherAuthReducer"
import parentAuthReducer from "../features/auth/parentAuthReducer"
import sharedTeacherDashboardReducer from "../features/dashboardSharedApi/teacherSharedreducer"
import teacherDashboardVideoSharedApi from "../features/dashboardSharedApi/videosSharedApi"
import sharedTeacherDashboardAssignReducer from "../features/dashboardSharedApi/teacherDashboardAssignReducer"
import sharedStudentDashboardAssignReducer from "../features/dashboardSharedApi/studentDashboardSharedApiReducer.js"
import sharedTeacherDashboardAssignQsnReducer from "../features/dashboardSharedApi/teacherDashboardAssignQsnReducer.js"

const rootReducer = combineReducers({
    auth: authReducer,
    sharedApi: sharedReducer,
    studentAuth:studentAuthReducer,
    teacherAuth:teacherAuthReducer,
    parentAuth:parentAuthReducer,
    teacherDashboardSharedApi :sharedTeacherDashboardReducer,
    teacherDashboardVideoSharedApi :teacherDashboardVideoSharedApi,
    teacherDashboardAssignSharedApi : sharedTeacherDashboardAssignReducer,
    studentDashboardNewAssignSharedApi : sharedStudentDashboardAssignReducer,
    teacherDashboardAssignQsnSharedApi : sharedTeacherDashboardAssignQsnReducer
});

export default rootReducer;