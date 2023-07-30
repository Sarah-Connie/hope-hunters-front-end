import { createContext, useContext, useEffect, useState} from 'react';
import axios from '../api/axios';

const AuthContext = createContext();
// const AuthContext = createContext({
//   isLoggedIn: false,
//   user: {
//     email: "",
//     token: "",
//     admin: false,
//     police: false,
//   },
//   login: () => {},
//   logout: () => {},
//   error: "",
// });

const AuthProvider = ({ children, location, history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  // const [user, setUser] = useState({ police: false });

  // // persist the login status 
  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   const loggedInStatus = sessionStorage.getItem("loggedInStatus")

  //   if (token && loggedInStatus === 'true') {
  //     setIsLoggedIn(true)
  //   } else logout();
  // }, []);
  
  // persist the login status 
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const loggedInStatus = sessionStorage.getItem("loggedInStatus");
  
    if (token && loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      logout();
    }
    console.log("User:", user);
  
  }, [user]);


  const loginUser = async (userData) => {
    try {
      const response = await axios.post('/users/login', userData);
  
      if (response.status === 200) {
        const responseData = response.data;
  
        if (responseData && responseData.token) {
          const { token, admin, police } = responseData;
          const user = { 
            token: responseData.token,
            admin: admin,
            police: police,
          };
          setUser(user);
          setAuthData(user);
          console.log('Setting user:', user); 
  
          setIsLoggedIn(true);
          sessionStorage.setItem("loggedInStatus", "true");
  
          // Refresh the token 
          await refreshAuthToken();
        
          // Setting the original token
          sessionStorage.setItem('token', token);
          console.log("Original token prior to refresh:", token)
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
          setError(errorMessage); 
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
  

  const refreshAuthToken = async () => {
    try {
      const oldToken = sessionStorage.getItem('token');

      if (oldToken) {
        const response = await axios.put(
          '/users/login/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${oldToken}`,
            },
          }
        );
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData && responseData.token) {
            sessionStorage.setItem('token', responseData.token);
            console.log('Token refreshed successfully');
            console.log('New Token:', responseData.token);
            
            setUser((user) => ({ ...user, token: responseData.token }));
            // console.log ("setting new user", user)
            return responseData.token; 
          }
        } else {
          setError('An error occurred while refreshing the token.');
        }
      }
    } catch (error) {
      console.error("Error while refreshing token:", error);
      setError('An error occurred while refreshing the token.');
      throw error; // Throw the error here
    }
  };
  


  const logout = () => {
    setAuthData(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('token');
    sessionStorage.setItem('loggedInStatus', 'false');

    console.log("Logout successful");
  };


  const setAuthData = (userData) => {
    setUser(userData);
    setError("");
  };

  
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login: loginUser, logout, error, refreshAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
