import React, { useState, useEffect } from "react";
import axios from '../api/axios';
const SIGNUP_URL = '/users/signup';

export function SignupForm() {  
  const [selectedOption, setSelectedOption] = useState(null)
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [stationName, setStationName] = useState("");
  const [policeAreaCommand, setPoliceAreaCommand] = useState("");
  const [policeDistrict, setPoliceDistrict] = useState("");

  const [verificationSent, setVerificationSent] = useState(false);


  const handleEmailChange = (event) => {
    const { value } = event.target;
    setUserEmail(value);

    // Check if email matches the required domain and update the selected option accordingly
    const domainPattern = /@police\.nsw\.gov\.au$/i;
    setSelectedOption(domainPattern.test(value) ? "police_user" : "");
  };


  useEffect(() => {
    validateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const validateEmail = () => {
    // Regular expression pattern for validating the email domain
    const domainPattern = /@police\.nsw\.gov\.au$/i;

    if (selectedOption === "police_user" && !domainPattern.test(userEmail)) {
      setEmailError("Email domain is incorrect.");
    } else {
      setEmailError("");
    }

    if (userPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
    }

    if (userPassword !== confirmedPassword) {
      setError("Passwords do not match. Please try again.");
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateEmail();

    if (emailError || userPassword.length < 8 || (userPassword!==confirmedPassword)) {
      setVerificationSent(false);
      return;
    }


    const formData = {
      fullName: userName,
      email: userEmail,
      password: confirmedPassword,
      stationName: stationName,
      policeAreaCommand: policeAreaCommand,
      policeDistrict: policeDistrict,
    };

    
    try {
      const response = await axios.post(SIGNUP_URL, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 && response.data.error) {
        // Check if the response contains an error
          setVerificationSent(false);
          setError(response.data.error);
      } 
      else if (response.status === 200 && response.data.message){
        // form submission successful, render component
        setError("");
        setVerificationSent(true);
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.message) {
        setVerificationSent(false);
        setError(error.response.data.message);
      } else {
        // Handle other error scenarios
        setVerificationSent(false);
        setError("An error occurred during sign up. Please try again.");
      }
    }
  };


  // Reset the error state whenever the form fields change + reenable submit button
  useEffect(() => {
    setError("");
  }, [userName, userEmail, userPassword, confirmedPassword, stationName, policeAreaCommand, policeDistrict]);

  const renderPoliceFields = () => {
    if (selectedOption === "police_user") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Station Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="stationName"
              name="stationName"
              onChange={(e) => setStationName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Police Area Command:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="policeAreaCommand"
              name="policeAreaCommand"
              onChange={(e) => setPoliceAreaCommand(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Police District:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="policeDistrict"
              name="policeDistrict"
              onChange={(e) => setPoliceDistrict(e.target.value)}
              required
            />
          </div>
        </>
      );
    }
    return null;
  };


    const renderForm = () => {
        return(
        <form
            className="font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4"
            onSubmit={handleSubmit}
        >
          <p className="flex font-main italic font-semibold text-xl pb-4 ">
          Enter your details below to signup.
          </p>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                name="fullName"
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={userEmail}
                onChange={handleEmailChange}
                required
            />
            {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
            )}
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmedPassword"
                type="password"
                name="confirmedPassword"
                onChange={(e) => setConfirmedPassword(e.target.value)}
                required
            />
            </div>
            <div className="mb-4 flex flex-row justify-evenly">
            <label className="block text-gray-700 text-sm font-bold">
                Police Account?
            </label>
            <div>
                <label>
                <input
                    type="radio"
                    value="police_user"
                    id="police"
                    checked={selectedOption === "police_user"}
                    onChange={handleOptionChange}
                    required
                />{" "}
                Yes
                </label>
            </div>
            <div>
                <label>
                <input
                    type="radio"
                    id="general"
                    value=""
                    checked={selectedOption === ""}
                    onChange={handleOptionChange}
                    required
                />{" "}
                No
                </label>
            </div>
            </div>
            {renderPoliceFields()}
            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <div className="flex items-center justify-center">
            <button
                    className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
                    type="submit"
                    
                  >Sign Up</button>
            </div>
        </form>
        );
    };
  

    const renderVerificationSentMessage = () => {
      if (verificationSent===true) {
      return (
        <div className="font-main flex justify-center text-center text-lg md:text-2xl">
            <p className="w-[300px] pb-5">A verification link has been sent to your email! Please confirm to verify your account.</p>
        </div>
        );
      }
      return null;
    };

    

    return (
        <div className="p-4">
            <div className="font-main font-bold flex text-center justify-center text-2xl pb-8 pt-8">
                <p>Become a Member<br/></p>
            </div>
            {verificationSent ? (
                renderVerificationSentMessage()
            ) : (
                renderForm()
            )}
        </div>
    );
}


export default SignupForm;