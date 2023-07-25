// import { useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';

// const PersistLogin = () => {
//   const { isLoggedIn, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn && user) {
//       const currentRoute = sessionStorage.getItem('currentRoute');
//       if (currentRoute && currentRoute !== '/') {
//         navigate(currentRoute); // Navigate to the saved current route
//       }
//     }
//   }, [isLoggedIn, user, navigate]);

//   return <Outlet />;; 
// }

// export default PersistLogin;

import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      const currentRoute = sessionStorage.getItem('currentRoute');
      if (currentRoute !== '/') {
        navigate(currentRoute); // Navigate to the saved current route
      }
    } else {
      // If user is not logged in, navigate to the home page 
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  // return (
  //   <>
  //     <Outlet />
  //   </>
  // );
  return null;
};

export default PersistLogin;
