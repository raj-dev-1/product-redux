import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;