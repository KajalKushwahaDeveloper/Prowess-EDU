
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginScreen';
import AdminDashboard from './pages/admin_dashboard/adminDashboardScreen';
import AdminDashboardTeachers from "../src/pages/admin_dashboard/adminDashboardTeachers";
import AdminDashboardStudent from "../src/pages/admin_dashboard/admindashboardStudents"
// import ParentDashboard from './ParentDashboard';
import SharedLayout from './components/layouts/sharedLayout';  // Layout with Header and Sidebar
import ProtectedRoute from './components/routes/protectedRoutes';
import Calender_Download_Component from './components/common/calender_download';
import LoginForm from './components/organisms/login_form';
import Dropdown from './components/molecules/dropdown';
import ParentDashboard from './pages/parent_dashboard/parentDashboardScreen';
import ParentDashboardStrongArea from './pages/parent_dashboard/parentDashboardStrongArea';
import ParentDashboardWeakArea from './pages/parent_dashboard/parentDashboardWeakArea';
// import Sidebar from "./components/organisms/sideBar.jsx";
// import Table from "./components/organisms/Table.jsx";


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Shared Layout with Protected Routes for Admin, Student, Teacher, and Parent */}
        <Route element={<ProtectedRoute role="admin"></ProtectedRoute>}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="student"></ProtectedRoute>}>
          <Route path="/students" element={<AdminDashboardStudent />} />
        </Route>

        <Route element={<ProtectedRoute role="teacher"></ProtectedRoute>}>
          <Route path="/parentdashboard" element={<ParentDashboard/>} />
        </Route>
        <Route element={<ProtectedRoute role="admin"></ProtectedRoute>}>
          <Route path="/strongArea" element={<ParentDashboardStrongArea />} />
        </Route>

        <Route element={<ProtectedRoute role="student"></ProtectedRoute>}>
          <Route path="/weakArea" element={<ParentDashboardWeakArea />} />
        </Route>

        <Route element={<ProtectedRoute role="teacher"></ProtectedRoute>}>
          <Route path="/teachers" element={<AdminDashboardTeachers />} />
        </Route>

        {/* <Route element={<ProtectedRoute role="parent"><SharedLayout /></ProtectedRoute>}>
          <Route path="/parent" element={<ParentDashboard />} />
        </Route> */}

        {/* Default route to redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
