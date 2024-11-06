import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginScreen';
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

function App() {
  return (
    // <StudentFAQ />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/*  Admin Dashboard */}
        <Route element={<ProtectedRoute role="admin"></ProtectedRoute>}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="student"></ProtectedRoute>}>
          <Route path="/students" element={<AdminDashboardStudent />} />
        </Route>

        <Route element={<ProtectedRoute role="teacher"></ProtectedRoute>}>
          <Route path="/teachers" element={<AdminDashboardTeachers />} />
        </Route>

        {/* Parent Dashboard */}
        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/parentdashboard" element={<ParentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/strongArea" element={<ParentDashboardStrongArea />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/weakArea" element={<ParentDashboardWeakArea />} />
        </Route>

        {/*  Student Dashboard */}
        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/studentDashboard" element={<StudentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/studentDashboardVideos" element={<StudentDashboardVideos />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/assignment" element={<AssignmentAndTest />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/onlineClass" element={<OnlineClass />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/faqFeedback" element={<FAQFeedback />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/studentFaq" element={<StudentFAQ />} />
        </Route>

        <Route element={<ProtectedRoute role=""></ProtectedRoute>}>
          <Route path="/studentFeedback" element={<StudentFeedback />} />
        </Route>

        {/*  Teacher Dashboard */}



        {/* Default route to redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
