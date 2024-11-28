export const BASE_URL = "https://rwtu9cjeni.execute-api.ap-south-1.amazonaws.com/dev";
export const ADMIN_LOGIN = BASE_URL + "/login";

export const GET_TEACHER = BASE_URL + "/getTeachers";
export const GET_STUDENT = BASE_URL + "/getStudents";
export const GET_PARENT = BASE_URL + "/getParents";
export const ADD_TEACHER = BASE_URL + "/addTeacher";
export const ADD_STUDENT = BASE_URL + "/addStudent";
export const ADD_PARENT = BASE_URL + "/addParent";
export const EDIT_TEACHER = (id) => `${BASE_URL}/editTeacher/${id}`;
export const EDIT_STUDENT = (id) => `${BASE_URL}/editStudent/${id}`;
export const EDIT_PARENT = (id) => `${BASE_URL}/editParent/${id}`;
export const DELETE_TEACHER = (id) => `${BASE_URL}/deleteTeacher${id}`;
export const DELETE_STUDENT = (id) => `${BASE_URL}/deleteStudent/${id}`;
export const DELETE_PARENT = (id) => `${BASE_URL}/deleteParent/${id}`;

// STUDENT_DASHBOARD
export const LOGIN_STUDENT = BASE_URL + "/studentLogin";

// TEACHER DASHBOARD
export const LOGIN_TEACHER = BASE_URL + "/teacherLogin";
export const T_D_GET_STUDENT_FOR_TEACHER = BASE_URL + "/getStudentsForTeacher";

export const T_D_GET_REPORT_FOR_TEACHER = BASE_URL + "/getReportsForTeacher";
export const T_D_CREATE_REPORT = BASE_URL + "/createReport";
export const T_D_EDIT_REPORT = (id) => `${BASE_URL}/editReport/${id}`;
export const T_D_DELETE_REPORT = (id) => `${BASE_URL}/deleteReport/${id}`;
export const T_D_GET_VIDEO_FOR_TEACHER = BASE_URL + "/getVideosForTeacher";
export const T_D_ADD_VIDEO = BASE_URL + "/addVideo";
export const T_D_EDIT_VIDEO = (id) => `${BASE_URL}/editVideo/${id}`;
export const T_D_DELETE_VIDEO = (id) => `${BASE_URL}/deleteVideo/${id}`;

// PARENT DASHBOARD
export const LOGIN_PARENT = BASE_URL + "/parentLogin";
