
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginScreen';
import AdminDashboard from './pages/admin_dashboard/adminDashboardScreen';
// import StudentDashboard from './StudentDashboard';
// import TeacherDashboard from './TeacherDashboard';
// import ParentDashboard from './ParentDashboard';
import SharedLayout from './components/layouts/sharedLayout';  // Layout with Header and Sidebar
import ProtectedRoute from './components/routes/protectedRoutes';
// import Sidebar from "./components/organisms/sideBar.jsx";
// import Table from "./components/organisms/Table.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Shared Layout with Protected Routes for Admin, Student, Teacher, and Parent */}
        <Route element={<ProtectedRoute role="admin"><SharedLayout /></ProtectedRoute>}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>

        {/* <Route element={<ProtectedRoute role="student"><SharedLayout /></ProtectedRoute>}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="teacher"><SharedLayout /></ProtectedRoute>}>
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="parent"><SharedLayout /></ProtectedRoute>}>
          <Route path="/parent" element={<ParentDashboard />} />
        </Route> */}

        {/* Default route to redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
