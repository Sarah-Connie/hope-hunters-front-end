import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = {
        email: userEmail,
        password: userPassword,
      };

      // Call the login function from the AuthContext to handle the login process
      await login(user);
      // Redirect to dashboard
      navigate("/dashboard");
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    
    }
  };

    // Reset the error state whenever the form fields change + reenable submit button
    useEffect(() => {
      setError("");
    }, [userEmail, userPassword]);
  

  return (
    <div className="p-4">
      <div className="font-main font-bold flex text-center justify-center text-2xl pb-8 pt-8">
        <p>Welcome Back<br/></p>
      </div>
      <form
          className="font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4"
          onSubmit={handleSubmit}
      >
        <p className="flex font-main italic font-semibold text-xl pb-4 ">
        Please login below.
        </p>
          <div className="mb-4">
            <label htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userEmail"
              type="email"
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userPassword"
              type="password"
              name="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="flex items-center justify-center pt-4">
            <button
              className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
              type="submit"
              name="Login"
              disabled={!!error} // disable the button if there is an error
            >Login</button>
          </div>
      </form>
  </div>
  );
}

export default LoginForm;
