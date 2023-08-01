// import { useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// const AccountVerification = () => {
//   const navigate = useNavigate();
//   const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

//   useEffect(() => {
//     // Extract the email from the URL parameter
//     const email = window.location.pathname.split("/verified/")[1];

//     // Check if email matches the required domain
//     const domainPattern = /@police\.nsw\.gov\.au$/i;
//     const isPoliceUser = domainPattern.test(email);

//     // Make the API call to the backend based on the email domain
//     const apiRoute = isPoliceUser
//       ? `/signup/police/confirmation/${email}`
//       : `/signup/general/confirmation/${email}`;

//     axios
//       .put(apiRoute)
//       .then((response) => {
//         if (isMdScreenOrLarger) {
//           navigate("/report");
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((error) => {
//        console.error("Error during email verification:", error);
//        // Redirect to an error page or show a generic error message
//       });
//   }, [navigate]);

//   return null;
// };

// export default AccountVerification;



// import { useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../api/axios";

// const AccountVerification = () => {
//   const navigate = useNavigate();
//   const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });
//   const { userEmail } = useParams(); // Access the dynamic useremail parameter

//   useEffect(() => {
//     // Check if email matches the required domain
//     const domainPattern = /@police\.nsw\.gov\.au$/i;
//     const isPoliceUser = domainPattern.test(userEmail);

//     // Make the API call to the backend based on the email domain
//     const apiRoute = isPoliceUser
//       ? `/signup/police/confirmation/${userEmail}`
//       : `/signup/general/confirmation/${userEmail}`;

//     axios
//       .put(apiRoute)
//       .then((response) => {
//         if (isMdScreenOrLarger) {
//           navigate("/report");
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((error) => {
//         console.error("Error during email verification:", error);
//         // Redirect to an error page or show a generic error message
//       });
//   }, [userEmail, navigate, isMdScreenOrLarger]);

//   return null;
// };

// export default AccountVerification;





import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./AuthContext";

const EmailVerification = () => {
  const navigate = useNavigate();
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });
  const { userEmail } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    // Check if email matches the required domain
    const domainPattern = /@police\.nsw\.gov\.au$/i;
    const isPoliceUser = domainPattern.test(userEmail);

    // Make the API call to the backend based on the email domain
    const apiRoute = isPoliceUser
      ? `users/signup/police/confirmation/${userEmail}`
      : `users/signup/general/confirmation/${userEmail}`;

    axios
      .put(apiRoute)
      .then((response) => {
        if (isMdScreenOrLarger) {
          navigate("/report");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
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
      });
  }, [userEmail, navigate, isMdScreenOrLarger]);

  return null;
};

export default EmailVerification;
