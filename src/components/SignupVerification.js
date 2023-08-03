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
        if (error.response && error.response.data && error.response.data.error) {

          const errorMessage = error.response.data.error;

          if (errorMessage === "User account could not be verified") {
            setError("User account could not be verified. Please try again. Rerouting now...");
          } else if (errorMessage === "Unable to find user document.") {
            setError("Account not found, please sign up instead. Rerouting now...");
          }
        } else {
          setError("Unable to verify your account. Please try again later. Rerouting now...");
        }

        // Set a timer to navigate after 5 seconds
        const timer = setTimeout(() => {
          if (isMdScreenOrLarger) {
            navigate("/report");
          } else {
            navigate("/signup");
          }
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    verifyEmail();
  }, [userEmail, navigate, isMdScreenOrLarger]);

  if (error) {
    // Render the error message if there is one
    return <p className="m-5 w-[500px] flex justify-center text-red-500 text-xl md:text-2xl ml-3 italic">{error}</p>;
  }

  return null;
};

export default EmailVerification;
