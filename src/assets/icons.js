// DashboardLinks.js
export const adminLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/adminDashboard" },
  { icon: "pi-user", name: "Teachers", path: "/teachers" },
  { icon: "pi-users", name: "Students", path: "/students" },
];

export const studentLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/studentDashboard" },
  { icon: "pi-video", name: "Video", path: "/studentDashboardVideos" },
  {
    icon: "pi-file-check",
    name: "Assignments & Tests",
    path: "/assignment",
  },
  { icon: "pi-desktop", name: "Online Class", path: "/OnlineClass" },
  { icon: "pi-question-circle", name: "FAQ/Feedback", path: "/faqFeedback" },
];

export const teacherLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/teacherDashboard" },
  { icon: "pi-user", name: "Students", path: "/teacherDashboardStudents" },
  { icon: "pi-video", name: "Video", path: "/teacherDashboardVideos" },
  {
    icon: "pi-file-check",
    name: "Assignments & Tests",
    path: "teacherDashboardAssignment",
  },
  {
    icon: "pi-desktop",
    name: "Online Classes",
    path: "teacherDashboardOnlineClass",
  },
  { icon: "pi-calendar-clock", name: "Timetable", path: "/teacherDashboardTimeTable" },
];

// Add parent links if necessary
export const parentLinks = [
  { icon: "pi-chart-line", name: "Student Reports", path: "/parentdashboard" },
  {
    icon: "pi-user",
    name: "Weak Area",
    path: "/WeakArea",
  },
  { icon: "pi-check-circle", name: "Strong Area", path: "/strongArea" },
];

export const Icons = {
  plusIcon: "pi-plus",
  editIcon: "pi pi-pen-to-square",
  viewIcon:"pi pi-eye",
  reloadIcon: "pi-refresh",
  downloadIcon: "pi-download",
  rightArrow: "pi-arrow-right",
  leftArrow: "pi-arrow-left",
  videoIcon: "pi pi-play",
  angleRight: "pi pi-angle-right",
  angleDown:"pi pi-angle-down"
};
