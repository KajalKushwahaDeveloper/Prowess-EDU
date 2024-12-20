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
import sharedStudentDashboardVideosReducer from "../features/dashboardSharedApi/studentDashboardvideosReducer.js"
import sharedTeacherDashboardAssignQsnReducer from "../features/dashboardSharedApi/teacherDashboardAssignQsnReducer.js"
import sharedTeacherDashboardOnlineClassReducer from "../features/dashboardSharedApi/teacherDashboardSharedApiReducer.js"
import sharedTeacherDashboardTestReducer from "../features/dashboardSharedApi/teacherDashboardTestReducer"
import sharedTeacherTimeTableReducer from "../features/dashboardSharedApi/teacherTimeTableReducer.js"
const rootReducer = combineReducers({
    auth: authReducer,
    sharedApi: sharedReducer,
    studentAuth:studentAuthReducer,
    teacherAuth:teacherAuthReducer,
    parentAuth:parentAuthReducer,
    teacherDashboardSharedApi :sharedTeacherDashboardReducer,
    videosSharedApi :teacherDashboardVideoSharedApi,
    teacherDashboardAssignSharedApi : sharedTeacherDashboardAssignReducer,
    studentDashboardNewAssignSharedApi : sharedStudentDashboardAssignReducer,
    studentDashboardNewVideosSharedApi : sharedStudentDashboardVideosReducer,
    teacherDashboardAssignQsnSharedApi : sharedTeacherDashboardAssignQsnReducer,
    teacherDashboardOnlineClassSharedApi : sharedTeacherDashboardOnlineClassReducer,
    teacherDashboardTestSharedApi : sharedTeacherDashboardTestReducer,
    teacherDashboardTimeTableSharedApi : sharedTeacherTimeTableReducer,
});

export default rootReducer;