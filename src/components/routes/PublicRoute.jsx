import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  
  if (isAuthenticated) {
    // Redirect to the page user tried to visit before login or home
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;