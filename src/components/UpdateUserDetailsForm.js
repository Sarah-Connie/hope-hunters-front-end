import React from "react";
import { useState } from "react";
import axios from "../api/axios";
import SuccessMsg from "./SuccessMsg";
import { useAuth } from "./AuthContext";


export function UpdateUserForm() {
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");
    const [verifySent, setVerifySent] = useState(false);

    const [userName, setUserName] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    // const [newEmail, setUserNewEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [stationName, setStationName] = useState("");
    const [policeAreaCommand, setPoliceAreaCommand] = useState("");
    const [policeDistrict, setPoliceDistrict] = useState("");


    const { user } = useAuth();
    const isPoliceUser = user.police;

//   const [showUpdateUserDetailsForm, setShowUpdateUserDetailsForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowUpdateUserDetailsForm(true);
//   };

  const userNameUpdate = (event) => {
    setUserName(event.target.value);
  };

  // const userEmailUpdate = (event) => {
  //   setUserEmail(event.target.value);
  // };

  // const userNewEmailUpdate = (event) => {
  //   setUserNewEmail(event.target.value);
  // };


  const passwordUpdate = (event) => {
    setUserPassword(event.target.value);
    setError("");
  };

  const confirmPasswordUpdate = (event) => {
    setConfirmPassword(event.target.value);
    setError("");
  };

  const stationNameUpdate = (event) => {
    setStationName(event.target.value);
  };

  const policeAreaCommandUpdate = (event) => {
    setPoliceAreaCommand(event.target.value);
  };

  const policeDistrictUpdate = (event) => {
    setPoliceDistrict(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (userPassword !== confirmPassword) {
          setError("Passwords do not match. Please try again.");
          return;
      }
      

      try {
          // updated user details object
          // const updatedUserDetails = {
          // name: userName,
          // // email: newEmail ? newEmail : userEmail,
          // password: confirmPassword,
          // stationName: stationName,
          // policeAreaCommand: policeAreaCommand,
          // policeDistrict: policeDistrict,
          // };

          const updatedUserDetails = {};

          if (userName && !isPoliceUser) {
            updatedUserDetails.name = userName;
          }

          if (confirmPassword) {
            updatedUserDetails.password = confirmPassword;
          }

          if (stationName && isPoliceUser) {
            updatedUserDetails.stationName = stationName;
          }

          if (policeAreaCommand && isPoliceUser) {
            updatedUserDetails.policeAreaCommand = policeAreaCommand;
          }

          if (policeDistrict && isPoliceUser) {
            updatedUserDetails.policeDistrict = policeDistrict;
          }

          const authToken = `Bearer ${sessionStorage.getItem("token")}`;
      
          const response = await axios.put("/users/update", updatedUserDetails, {
            headers: {
              Authorization: authToken,
            },
          });

      
          if (response.status === 200) {
            const data = response.data;
            console.log("User details updated successfully:", data);
            setVerifySent(true); // Show the success message
          } else {
            console.error("Failed to update user details:", response.data.error);
            setError(response.data.error);
          }
        } catch (error) {
          console.error("Error:", error);
          setError("An error occurred during the update. Please try again.");
        }
      };
        
const updateDetailsForm = () => {
  return (
    <div>
        <p className="flex justify-center w-full font-main font-semibold text-2xl lg:ml-5 my-4">
            Update Account Details
        </p>
        <form className="flex flex-col w-full font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4 lg:ml-5"
        onSubmit={handleSubmit}>
           <div className="flex justify-center font-main italic text-xl mb-4">Enter your details below.</div>
        {/* disable ability to change account name */}
        {!isPoliceUser && (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
                Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            id="name" 
            name="fullName" 
            value={userName}
            onChange={userNameUpdate}
            />
          </div>
        )}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
                Current Email:
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" 
            id="email" 
            name="email" 
            value={userEmail}
            onChange={userEmailUpdate}
            required
             />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
                New Email:
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" 
            id="newEmail" 
            name="newEmail" 
            value={newEmail}
            onChange={userNewEmailUpdate}
             />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
                New Password:
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            id="password" 
            name="password" 
            value={userPassword}
            onChange={passwordUpdate}
             />
          </div>
          <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={confirmPasswordUpdate}
            required={userPassword.trim() !== ''}
          />
        </div>
          {isPoliceUser && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stationName">
                  Station Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="stationName"
                  name="stationName"
                  value={stationName}
                  onChange={stationNameUpdate}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policeAreaCommand">
                  Police Area Command:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="policeAreaCommand"
                  name="policeAreaCommand"
                  value={policeAreaCommand}
                  onChange={policeAreaCommandUpdate}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policeDistrict">
                  Police District:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="policeDistrict"
                  name="policeDistrict"
                  value={policeDistrict}
                  onChange={policeDistrictUpdate}
                  required
                />
              </div>
            </>
          )}
          {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
          <div className="flex items-center justify-center pt-4">
            <button
            className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
            type="submit"
            disabled={!!error} // disable the button if there is an error
            >Submit</button>
          </div>
        </form>
    </div>
  );
}

// const renderSuccessMessage = () => {
//     return (
//     <div className="font-main flex justify-center text-center text-lg md:text-2xl">
//         <p className="w-1/2">Thank you. <br/><br/> Your account details have successfully been updated.</p>
//     </div>
//     );
//     };

return (
    <div>
        {verifySent ? (
            <SuccessMsg message={"Thank you. Your account details have successfully been updated."} />
            ) : (
            updateDetailsForm()
        )}
    </div>
  );
};


export default UpdateUserForm;
