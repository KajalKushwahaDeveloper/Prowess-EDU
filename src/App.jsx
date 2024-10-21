
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginScreen';
import AdminDashboard from './pages/admin_dashboard/adminDashboardScreen';
// import StudentsTable from '../component/organism/studentTable';
// import TeachersTable from '../component/organism/teachersTable';
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
{/*         
        <Route element={<ProtectedRoute role="student"><SharedLayout /></ProtectedRoute>}>
          <Route path="/teachers" element={<StudentsTable/>} />
        </Route>

        <Route element={<ProtectedRoute role="teacher"><SharedLayout /></ProtectedRoute>}>
          <Route path="/students" element={<TeachersTable />} />
        </Route> */}

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
