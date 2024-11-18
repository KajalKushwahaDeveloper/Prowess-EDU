export const BASE_URL = "https://rwtu9cjeni.execute-api.ap-south-1.amazonaws.com/dev";
export const ADMIN_LOGIN = BASE_URL + "/login";

// TEACHER DASHBOARD
export const LOGIN_TEACHER = BASE_URL + "/teacherLogin";
export const GET_TEACHER = BASE_URL + "/getTeachers";
export const ADD_TEACHER = BASE_URL + "/addTeacher";
export const EDIT_TEACHER = (id) => `${BASE_URL}/editTeacher/${id}`;
export const DELETE_TEACHER = (id) => `${BASE_URL}/deleteTeacher${id}`;
// STUDENT DASHBOARD
export const LOGIN_STUDENT = BASE_URL + "/studentLogin";
export const GET_STUDENT = BASE_URL + "/getStudents";
export const ADD_STUDENT = BASE_URL + "/addStudent";
export const EDIT_STUDENT = (id) => `${BASE_URL}/editStudent/${id}`;
export const DELETE_STUDENT = (id) => `${BASE_URL}/deleteStudent/${id}`;
// PARENT DASHBOARD
export const LOGIN_PARENT = BASE_URL + "/teacherLogin";
export const GET_PARENT = BASE_URL + "/getParents";
export const ADD_PARENT = BASE_URL + "/addParent";
export const EDIT_PARENT = (id) => `${BASE_URL}/editParent/${id}`;
export const DELETE_PARENT = (id) => `${BASE_URL}/deleteParent/${id}`;