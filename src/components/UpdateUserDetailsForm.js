import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import SuccessMsg from "./SuccessMsg";
import { useAuth } from "./AuthContext";
import NewMPForm from "./NewMPForm";

export function UpdateUserForm() {
    const [error, setError] = useState("");
    const [verifySent, setVerifySent] = useState(false);
    const [showNewMPForm, setShowNewMPForm] = useState(false);

    const [userName, setUserName] = useState("");
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

          // set userDetails as an empty array and conditionally populate
          // to send the data to the backend to avoid overwriting as null
          const updatedUserDetails = {};

          // police can't change username
          if (userName && !isPoliceUser) {
            updatedUserDetails.fullName = userName;
          }

          // only send the confirmed pw as confirmed must match new pw
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
            console.log("User details updated successfully");
            setVerifySent(true); // Show the success message

            // reset the form fields
            setUserName("")
            setUserPassword("")
            setConfirmPassword("")
            setStationName("")
            setPoliceAreaCommand("")
            setPoliceDistrict("")

          } else {
            setVerifySent(false);
            setError("Failed to updated user details.");
          }
        } catch (error) {
          setVerifySent(false);
          setError("An error occurred during the update. Please try again later.");
        }
      };
        
  const updateDetailsForm = () => {
    return (
      <div>
          <p className="flex justify-center w-full font-main font-semibold text-2xl lg:ml-5 my-4">
              Update Account Details
          </p>
          <form className="flex flex-col w-full font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4 lg:ml-3"
          onSubmit={handleSubmit}>
            <div className="flex justify-center font-main italic text-xl mb-4">Enter your details below.</div>
          {/* disable ability to change account name for police users */}
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
              minLength={8}
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
              minLength={8}
              // this field is only required if the new pw field is present
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


  // timer to render default dash when form has been sent, after success msg shown
  useEffect(() => {
    let timer;
    if (verifySent) {
      timer = setTimeout(() => {
        setVerifySent(false);
        setShowNewMPForm(true)
      }, 3000);
    }

    // Clear the timer when the component unmounts or when verifySent changes
    return () => clearTimeout(timer);
  }, [verifySent]);


  return (
      <div>
          {verifySent ? (
              <SuccessMsg message={"Thank you. Your account details have successfully been updated."} />
              ) : showNewMPForm ? (
                <NewMPForm /> 
              ) : (
              updateDetailsForm()
          )}
      </div>
      );
};


export default UpdateUserForm;
