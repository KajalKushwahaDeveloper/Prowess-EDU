// DashboardLinks.js
export const adminLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/admin" },
  { icon: "pi-user-plus", name: "Teachers", path: "/admin/teachers" },
  { icon: "pi-user", name: "Students", path: "/admin/students" },
  { icon: "pi-users", name: "Parent", path: "/admin/parent" },
];

export const studentLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/student" },
  { icon: "pi-video", name: "Video", path: "/student/studentDashboardVideos" },
  {
    icon: "pi-file-check",
    name: "Assignments & Tests",
    path: "/student/assignment",
  },
  { icon: "pi-desktop", name: "Online Class", path: "/student/OnlineClass" },
  { icon: "pi-question-circle", name: "FAQ/Feedback", path: "/student/faqFeedback" },
];

export const teacherLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/teacher" },
  { icon: "pi-user", name: "Students", path: "/teacher/teacherDashboardStudents" },
  { icon: "pi-video", name: "Video", path: "/teacher/teacherDashboardVideos" },
  {
    icon: "pi-file-check",
    name: "Assignments & Tests",
    path: "/teacher/teacherDashboardAssignment",
  },
  {
    icon: "pi-desktop",
    name: "Online Classes",
    path: "/teacher/teacherDashboardOnlineClass",
  },
  { icon: "pi-calendar-clock", name: "Timetable", path: "/teacher/teacherDashboardTimeTable" },
];

// Add parent links if necessary
export const parentLinks = [
  { icon: "pi-chart-line", name: "Student Reports", path: "/parent" },
  {
    icon: "pi-user",
    name: "Weak Area",
    path: "/parent/WeakArea",
  },
  { icon: "pi-check-circle", name: "Strong Area", path: "/parent/strongArea" },
];

export const Icons = {
  plusIcon: "pi pi-plus",
  editIcon: "pi pi-pen-to-square",
  viewIcon:"pi pi-eye",
  deleteIcon:"pi pi-trash",
  reloadIcon: "pi-refresh",
  downloadIcon: "pi-download",
  leftArrow: "pi pi-arrow-left",
  videoIcon: "pi pi-play",
  angleRight: "pi pi-angle-right",
  angleDown:"pi pi-angle-down",
  rightArrow:"pi pi-arrow-right",
};
