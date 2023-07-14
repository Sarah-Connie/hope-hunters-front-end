import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function LoginForm(){
    const [userEmail,setUserEmail]=useState()
    const [userPassword,setUserPassword]=useState()
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const emailUpdate=(event)=>{ 
        setUserEmail(event.target.value)
    }

    const passwordUpdate=(event)=>{ 
        setUserPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch("", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail, password: userPassword }),
          });
    
          if (response.status === 200) {
            const responseData = await response.json();
    
            if (responseData && responseData.token) {
              // User login successful
              // If the verification is successful, proceed with storing the token
              if (
                responseData.email === userEmail &&
                responseData.password === userPassword
              ) {
                // Store the token in local storage or cookie
                localStorage.setItem("jwt", responseData.token);
    
                // route user to their user dashboard
                console.log("Login successful");
                navigate("/dashboard");
              } else {
                // User login failed (invalid credentials)
                setError("Invalid email or password. Please try again");
              }
            }
          } else {
            // User login failed (error status code)
            setError("Error: " + response.statusText);
          }
        } catch (error) {
          // Error occurred during the fetch request
          console.error("Error:", error);
          setError("An error occurred during login. Please try again.");
        }
      };
    
    return (
        <div>
            <div className="font-main font-bold flex justify-center text-2xl pb-8 pt-8"><p>Login Below</p></div>
            <form
                className="font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="user_email"
                    onChange={emailUpdate}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="user_password"
                    onChange={passwordUpdate}
                    required
                  />
                </div>
                {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <div className="flex items-center justify-center">
                  <input
                    className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
                    type="submit"
                    value="Login"
                  />
                </div>
            </form>
        </div>
        );
    }
    
    export default LoginForm;