import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const PersistLogin = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      const currentRoute = sessionStorage.getItem('currentRoute');
      if (currentRoute && currentRoute !== '/') {
        navigate(currentRoute); // Navigate to the saved current route
      }
    }
  }, [isLoggedIn, user, navigate]);

  return null; 
}

export default PersistLogin;
