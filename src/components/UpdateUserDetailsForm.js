import React from "react";
import { useState } from "react";
import SuccessMsg from "./SuccessMsg";

export function UpdateUserForm() {
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");
    const [verifySent, setVerifySent] = useState(false);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [stationName, setStationName] = useState("");
    const [policeAreaCommand, setPoliceAreaCommand] = useState("");
    const [policeDistrict, setPoliceDistrict] = useState("");

    const isPoliceUser = userEmail.endsWith("@police.nsw.gov.au");

//   const [showUpdateUserDetailsForm, setShowUpdateUserDetailsForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowUpdateUserDetailsForm(true);
//   };

//   const userNameUpdate = (event) => {
//     setUserName(event.target.value);
//   };

  const userEmailUpdate = (event) => {
    setUserEmail(event.target.value);
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
          // updated user details object
          const updatedUserDetails = {
          // name: userName,
          email: userEmail,
          password: confirmPassword,
          stationName: stationName,
          policeAreaCommand: policeAreaCommand,
          policeDistrict: policeDistrict,
          };
      
          const response = await fetch("", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserDetails),
          });
      
          if (response.ok) {
              console.log("User details updated successfully.");
              verifySent(true);
          } else {
              console.error("Failed to update user details.");
              setError("Failed to update user details.")
          }
      } catch (error) {
          console.error("Error:", error);
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
        {/* disable ability to change account name */}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
                Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            id="name" 
            name="fullName" 
            value={userName}
            onChange={userNameUpdate}
            required />
          </div> */}
          <div className="flex justify-center font-main text-xl mb-4">Enter your details below.</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
                New Email:
            </label>
            <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" 
            id="email" 
            name="email" 
            value={userEmail}
            onChange={userEmailUpdate}
            required />
          </div>
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
            required />
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
            required
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
