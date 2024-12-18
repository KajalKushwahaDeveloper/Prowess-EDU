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
export const S_D_GET_NEW_ASIGN_FOR_STUDENT =  BASE_URL + "/getNewAssignForStudent";
export const S_D_GET_ASSIGN_QSNS_FOR_STUDENT =  BASE_URL + "/getAssignQsnsForStudent";
export const S_D_GET_NEW_VIDEOS_FOR_STUDENT =  BASE_URL + "/getNewVideosForStudent";
export const S_D_GET_NEW_TEST_FOR_STUDENT =  BASE_URL + "/getNewTestForStudent";
export const S_D_GET_TEST_QSNS_FOR_STUDENT =  BASE_URL + "/getTestQsnsForStudent";
export const S_D_GET_ONLINE_CLASSES_FOR_STUDENT =  BASE_URL + "/getOnlineClassesForStudent";
export const S_D_UPDATE_ONLINE_CLASSES_FOR_STUDENT = (id) => `${BASE_URL}/updateOnlineClassStatusn/${id}`;

// TEACHER DASHBOARD
export const LOGIN_TEACHER = BASE_URL + "/teacherLogin";
export const T_D_GET_STUDENT_FOR_TEACHER = BASE_URL + "/getStudentsForTeacher";

export const T_D_GET_REPORT_FOR_TEACHER = BASE_URL + "/getReportsForTeacher";
export const T_D_CREATE_REPORT = BASE_URL + "/createReport";
export const T_D_EDIT_REPORT = (id) => `${BASE_URL}/editReport/${id}`;
export const T_D_DELETE_REPORT = (id) => `${BASE_URL}/deleteReport/${id}`;

export const T_D_PRESIGNED_URL = BASE_URL + "/presignedUrl";
export const T_D_GET_VIDEO_FOR_TEACHER = BASE_URL + "/getVideosForTeacher";
export const T_D_ADD_VIDEO = BASE_URL + "/addVideo";
export const T_D_EDIT_VIDEO = (id) => `${BASE_URL}/editVideo/${id}`;
export const T_D_DELETE_VIDEO = (id) => `${BASE_URL}/deleteVideo/${id}`;
export const T_D_GET_ASIGNMENT_FOR_TEACHER = BASE_URL + "/getAssignForTeacher";
export const T_D_ADD_ASSIGNMENT = BASE_URL + "/addAssign";
export const T_D_EDIT_ASSIGNMENT = (id) => `${BASE_URL}/editAssign/${id}`;
export const T_D_DELETE_ASSIGNMENT = (id) => `${BASE_URL}/deleteAssign/${id}`;
export const T_D_GET_ASSIGN_QSNS_FOR_TEACHER = BASE_URL + "/getAssignQsnsForTeacher";
export const T_D_ADD_ASSIGN_QNSN = BASE_URL + "/addAssignQsn";
export const T_D_EDIT_ASSIGN_QNSN = (id) => `${BASE_URL}/editAssignQsn/${id}`;
export const T_D_DELETE_ASSIGN_QNSN = (id) => `${BASE_URL}/deleteAssignQsn/${id}`;

//test 
export const T_D_GET_TEST_FOR_TEACHER = BASE_URL + "/getTestForTeacher";
export const T_D_ADD_TEST = BASE_URL + "/addTest";
export const T_D_EDIT_TEST = (id) => `${BASE_URL}/editTest/${id}`;
export const T_D_DELETE_TEST = (id) => `${BASE_URL}/deleteTest/${id}`;

// Online Classes For Teacher
export const T_D_GET_ONLINE_CLASSES_FOR_TEACHER = BASE_URL + "/getOnlineClassesForTeacher";
export const T_D_ADD_ONLINE_CLASSES = BASE_URL + "/addOnlineClass";
export const T_D_UPDATE_ONLINE_CLASSES = (id) => `${BASE_URL}/editOnlineClass/${id}`;
export const T_D_DELETE_ONLINE_CLASSES = (id) => `${BASE_URL}/deleteOnlineClass/${id}`;

// PARENT DASHBOARD
export const LOGIN_PARENT = BASE_URL + "/parentLogin";
