import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin_dashboard/loginScreen';
import AdminDashboard from './pages/admin_dashboard/adminDashboardScreen';
import AdminDashboardTeachers from "../src/pages/admin_dashboard/adminDashboardTeachers";
import AdminDashboardStudent from "../src/pages/admin_dashboard/admindashboardStudents"
import SharedLayout from './components/layouts/sharedLayout';  // Layout with Header and Sidebar
import ProtectedRoute from './components/routes/protectedRoutes';
import ParentDashboard from './pages/parent_dashboard/parentDashboardScreen';
import ParentDashboardStrongArea from './pages/parent_dashboard/parentDashboardStrongArea';
import ParentDashboardWeakArea from './pages/parent_dashboard/parentDashboardWeakArea';
import StudentDashboard from './pages/student_dashboard/studentDashboardScreen';
import StudentDashboardVideos from './pages/student_dashboard/studentDashboardVideos';
import AssignmentAndTest from './pages/student_dashboard/assignmentAndTest';
import OnlineClass from './pages/student_dashboard/onlineClass';
import FAQFeedback from './pages/student_dashboard/faqAndFeedback';
import StudentFAQ from './components/common/studentFAQ';
import StudentFeedback from './components/common/studentFeedback';
import TeacherDashboard from './pages/teacher_dashboard/teacherDashboardScreen';
import TeacherDashboardStudents from './pages/teacher_dashboard/teacherDashboardStudentReport';
import TeacherDashboardVideos from './pages/teacher_dashboard/teachersVideo';
import TeacherDashboardAssignment from './pages/teacher_dashboard/teacherDashboardAssignment';
import TeacherDashboardOnlineClass from './pages/teacher_dashboard/teacherDashboardOnlineClass';
import TeacherDashboardTimeTable from './pages/teacher_dashboard/teacherDashboardTimeTable';
import NotFound from './pages/pageNotFound';
import AdminDashboardParent from './pages/admin_dashboard/adminDashboardParent';
import ParentLoginScreen from './pages/parent_dashboard/parentLoginScreen';

function App() {
  return (
    // <StudentFAQ />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/parentLogin" element={<ParentLoginScreen />} />
        <Route path="/StudentLogin" element={<ParentLoginScreen />} />
        <Route path="/teacherLogin" element={<ParentLoginScreen />} />

        {/*  Admin Dashboard */}
        <Route path="/admin" element={<ProtectedRoute userRole="admin"><AdminDashboard /></ProtectedRoute>}>
          {/* Index route for /admin */}
          <Route index element={<AdminDashboard />} />
          {/* Nested routes */}
          <Route path="students" element={<AdminDashboardStudent />} />
          <Route path="teachers" element={<AdminDashboardTeachers />} />
          <Route path="parent" element={<AdminDashboardParent />} />
        </Route>

        {/* Parent Dashboard */}
        <Route path="/parent" element={<ProtectedRoute userRole="parent"><ParentDashboard /></ProtectedRoute>}>
          <Route index element={<ParentDashboard/>} />
          {/* Nested routes */}
          <Route path="strongArea" element={<ParentDashboardStrongArea />} />
          <Route path="weakArea" element={<ParentDashboardWeakArea />} />
        </Route>


        {/*  Student Dashboard */}
        <Route path="/student" element={<ProtectedRoute userRole="student"><StudentDashboard /></ProtectedRoute>}>
          {/* Index route for /teacher */}
          <Route index element={<StudentDashboard />} />
          {/* Nested routes */}
          <Route path="studentDashboardVideos" element={<StudentDashboardVideos />} />
          <Route path="assignment" element={<AssignmentAndTest />} />
          <Route path="onlineClass" element={<OnlineClass />} />
          <Route path="faqFeedback" element={<FAQFeedback />} />
          <Route path="studentFaq" element={<StudentFAQ />} />
          <Route path="studentFeedback" element={<StudentFeedback />} />
        </Route>

        {/* Teacher Dashboard */}
        <Route path="/teacher" element={<ProtectedRoute userRole="teacher"><TeacherDashboard /></ProtectedRoute>}>
          <Route index element={<TeacherDashboard />} />
          {/* Nested routes */}
          <Route path="teacherDashboardStudents" element={<TeacherDashboardStudents />} />
          <Route path="teacherDashboardVideos" element={<TeacherDashboardVideos />} />
          <Route path="teacherDashboardAssignment" element={<TeacherDashboardAssignment />} />
          <Route path="teacherDashboardOnlineClass" element={<TeacherDashboardOnlineClass />} />
          <Route path="teacherDashboardTimeTable" element={<TeacherDashboardTimeTable />} />
        </Route>


        {/* Default route to redirect to login */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
