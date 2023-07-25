import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/" replace />;

};

export default PrivateRoute;