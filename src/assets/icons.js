// DashboardLinks.js
export const adminLinks = [
    { icon: "pi-home", name: "Dashboard", path: "/admin/dashboard" },
    { icon: "pi-user", name: "Teachers", path: "/admin/teachers" },
    { icon: "pi-users", name: "Students", path: "/admin/students" },
    { icon: "pi-chart-line", name: "Student Report", path: "/admin/student-report" },
  ];
  
  export const studentLinks = [
    { icon: "pi-video", name: "Video", path: "/student/video" },
    { icon: "pi-file-check", name: "Assignments & Tests", path: "/student/assignments" },
    { icon: "pi-question-circle", name: "FAQ/Feedback", path: "/student/faq" },
  ];
  
  export const teacherLinks = [
    { icon: "pi-home", name: "Dashboard", path: "/teacher/dashboard" },
    { icon: "pi-user", name: "Students", path: "/teacher/students" },
    { icon: "pi-video", name: "Video", path: "/teacher/video" },
    { icon: "pi-file-check", name: "Assignments & Tests", path: "/teacher/assignments" },
    { icon: "pi-calendar-clock", name: "Timetable", path: "/teacher/timetable" },
  ];
  
  // Add parent links if necessary
  export const parentLinks = [
    // Add icon, name, and path for parent dashboard links
  ];
  