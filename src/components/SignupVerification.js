import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const EmailVerification = () => {
  const navigate = useNavigate();
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });
  const { userEmail } = useParams();

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
        console.log(apiRoute)

        if (response.status === 200) {
          if (isMdScreenOrLarger) {
            navigate("/report");
          } else {
            navigate("/login");
          }
        } else {
          // Handle unexpected API response
          console.error("Unexpected API response:", response);
          // Redirect to an error page or show a generic error message
        }
      } catch (error) {
        // Handle error response
        if (error.response && error.response.data && error.response.data.error) {
          // Check if there's an error message in the response data
          const errorMessage = error.response.data.error;
          if (errorMessage === "User account could not be verified") {
            // Show error message and redirect to the signup page again
            console.error("User account could not be verified:", errorMessage);
            if (isMdScreenOrLarger) {
              navigate("/report");
            } else {
              navigate("/signup");
            }
          } else if (errorMessage === "Unable to find user document.") {
            console.error("Unable to find user document:", errorMessage);
            if (isMdScreenOrLarger) {
              navigate("/report");
            } else {
              navigate("/signup");
            }
          } else {
            console.error("Other error:", errorMessage);
            // Redirect to an error page or show a generic error message
          }
        } else {
          // Handle other error scenarios
          console.error("Error during email verification:", error);
          // Redirect to an error page or show a generic error message
        }
      }
    };

    verifyEmail();
  }, [userEmail, navigate, isMdScreenOrLarger]);

  return null;
};

export default EmailVerification;
