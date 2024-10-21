import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('role');  // Get the user's role (for demo purposes)
  const location = useLocation();

  if (userRole !== role) {
    // Redirect to login if the role does not match
    // return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;  // If role matches, allow access to the route
};

export default ProtectedRoute;
