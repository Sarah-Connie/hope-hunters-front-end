import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const EmailVerification = () => {
  const navigate = useNavigate();
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });
  const { userEmail } = useParams();
  const [error, setError] = useState(null);


  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if email matches the required domain
        const domainPattern = /@police\.nsw\.gov\.au$/i;
        const isPoliceUser = domainPattern.test(userEmail);

        // Make the API call to the backend based on the email domain
        const apiRoute = isPoliceUser
          ? `users/signup/police/confirmation/${userEmail}`
          : `users/signup/general/confirmation/${userEmail}`;
        

        const response = await axios.put(apiRoute);
        
        if (response.status === 200) {
          if (isMdScreenOrLarger) {
            navigate("/report");
          } else {
            navigate("/login");
          }
        } else {
          setError("")
        }
      } catch (error) {
        // Handle error response
        if (error.response && error.response.data && error.response.data.error) {
          // Check if there's an error message in the response data
          const errorMessage = error.response.data.error;
          if (errorMessage === "User account could not be verified") {
            // Show error message and redirect to the signup page again
            setError("User account could not be verified. Please try again.");
            if (isMdScreenOrLarger) {
              navigate("/report");
            } else {
              navigate("/signup");
            }
          } else if (errorMessage === "Unable to find user document.") {
            setError("Account not found, please sign up instead.");
            if (isMdScreenOrLarger) {
              navigate("/report");
            } else {
              navigate("/signup");
            }
          }
        } else {
          setError("Unable to verify your account. Please try again later.");
        }
      }
    };

    verifyEmail();
  }, [userEmail, navigate, isMdScreenOrLarger]);

  if (error) {
    // Render the error message if there is one
    return <p className="m-5 w-full flex justify-center text-red-500 text-xl md:text-2xl ml-3 italic">{error}</p>;
  }

  return null;
};

export default EmailVerification;
