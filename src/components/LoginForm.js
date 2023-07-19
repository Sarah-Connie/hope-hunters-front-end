import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Mock response for development purposes
      const response = {
        status: 200,
        json: () => ({
          email: userEmail,
          password: userPassword,
          jwt: { token: "fakeTokenHereForTesting" },
        }),
      };

    // add DB url
    // const response = await fetch("", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email: userEmail, password: userPassword }),
    // });

      if (response.status === 200) {
        const responseData = await response.json();

        if (responseData && responseData.jwt) {
          // User login successful
          // if verification is successful, proceed with storing the token
          if (
            responseData.email === userEmail &&
            responseData.password === userPassword
          ) {
            const { email, jwt } = responseData;
            // const user = { email: userEmail, jwt: responseData.jwt.token};
            const user = { email, jwt: jwt.token };

            // Call the login function from the AuthContext to persist the login state
            // console.log(user.jwt)
            // console.log(user.email)
            login(user);

            // route user to their user dashboard
            console.log("Login successful");
            navigate("/dashboard");
          }
        } else if (response.status === 401) {
            const responseData = await response.json();
    
            if (responseData.error === "User not found.") {
                // if user email not found in the database
                setError("Email not found. Please sign up instead.");
            }
            else if (responseData.error === "Incorrect password.") {
                // if user password not found in the database
                setError("Incorrect password. Please try again.");
            }
            // if no jwt returned
            else {
                setError("Please confirm your email account before attempting login.");
            }
        }
      }
    }
      catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
  <div className="p-4">
      <div className="font-main font-bold flex text-center justify-center text-2xl pb-8 pt-8"><p>Welcome Back<br/></p>
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