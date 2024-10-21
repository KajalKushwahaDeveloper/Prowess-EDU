// DashboardLinks.js
export const adminLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/adminDashboard" },
  { icon: "pi-user", name: "Teachers", path: "/teachers" },
  { icon: "pi-users", name: "Students", path: "/students" },
];

export const studentLinks = [
  { icon: "pi-video", name: "Video", path: "/student/video" },
  {
    icon: "pi-file-check",
    name: "Assignments & Tests",
    path: "/student/assignments",
  },
  { icon: "pi-question-circle", name: "FAQ/Feedback", path: "/student/faq" },
];

export const teacherLinks = [
  { icon: "pi-home", name: "Dashboard", path: "/teacher/dashboard" },
  { icon: "pi-user", name: "Students", path: "/teacher/students" },
  { icon: "pi-video", name: "Video", path: "/teacher/video" },
  {
    icon: "pi-file-check",
    name: "Assignments & Tests",
    path: "/teacher/assignments",
  },
  { icon: "pi-calendar-clock", name: "Timetable", path: "/teacher/timetable" },
];

// Add parent links if necessary
export const parentLinks = [
  { icon: "pi-chart-line", name: "Student Reports", path: "/student/video" },
  {
    icon: "pi-user",
    name: "Weak Area",
    path: "/student/assignments",
  },
  { icon: "pi-check-circle", name: "Strong Area", path: "/student/faq" },
];

export const Icons = {
  plusIcon: "pi-plus",
  editIcon: "pi-pen-to-square",
  reloadIcon: "pi-refresh",
  downloadIcon: "pi-download", 
};
