import { createContext, useContext, useEffect, useState} from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children, location, history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const loggedInStatus = sessionStorage.getItem("loggedInStatus")

    if (token && loggedInStatus === 'true') {
      setIsLoggedIn(true)
    } else logout();
  }, []);

  const loginUser = async (userData) => {
    try {
      const response = await axios.post('/users/login', userData);

      if (response.status === 200) {
        const responseData = response.data;

        if (responseData && responseData.token) {
          const { email, token } = responseData;
          const user = { email, jwt: token };
          // setUser(user);
          setAuthData(user);
          setIsLoggedIn(true);
          
          sessionStorage.setItem("loggedInStatus", "true")

          await refreshAuthToken();
          sessionStorage.setItem('token', token);

          console.log("Login successful");
        }
      }
    }
    catch (error) {
      console.log(error);
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error;
        if (status === 400) {
          // Access the error message from the Axios error response
          setError(errorMessage); // Set the error state with the error message
        } else if (status === 401) {
          setError(errorMessage);
        } else if (status === 404) {
          setError(errorMessage);
        }
        // } else if (status === 401) {
        //   refreshAuthToken();
        // } 
        else {
          setError("An error occurred during login. Please try again.");
        }
      } else {
        setError("An error occurred during login. Please try again.");
      }
      throw error;
    }
  };

  const logout = () => {
    setAuthData(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('token');
    sessionStorage.setItem('loggedInStatus', 'false');

    console.log("Logout successful");
  };

  // const verifyToken = async (token) => {
  //   try {
  //     // Add a custom header for authentication
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     // Send a request to a protected route to verify the token
  //     const response = await axios.get('/users/protected-route', config);

  //     if (response.status === 200) {
  //       const responseData = response.data;
  //       const user = { email: responseData.email, jwt: token };
  //       setAuthData(user);
  //       setIsLoggedIn(true);
  //       sessionStorage.setItem('token', token);
  //     } else {
  //       logout(); // Token verification failed, so log out the user
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     logout(); // Error occurred while verifying, so log out the user
  //   }
  // };
  const verifyToken = async (token) => {
    try {
      const response = await axios.put('', { token });
      

      if (response.status === 200) {
        const responseData = response.data;

        if (responseData && responseData.email) {
          const { email } = responseData;
          const user = { email, jwt: token };
          setAuthData(user);
          setIsLoggedIn(true);
          console.log("Token verified");
        }
      }
    } catch (error) {
      // If the token is expired, refresh it
      if (error.response && error.response.status === 401) {
        refreshAuthToken();
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  const setAuthData = (userData) => {
    setUser(userData);
    setError("");
  };

  const refreshAuthToken = async () => {
    try {
      const token = sessionStorage.getItem('token');

      if (token) {
        const response = await axios.put(
          '/login/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const responseData = response.data;
          if (responseData && responseData.token) {
            sessionStorage.setItem('token', responseData.token);
            console.log('Token refreshed successfully');
          }
        } else {
          setError('An error occurred while refreshing the token.');
        }
      }
    } catch (error) {
      setError('An error occurred while refreshing the token.');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login: loginUser, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
