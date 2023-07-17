import React, { useState, useEffect } from "react";

export function SignupForm() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [stationName, setStationName] = useState("");
  const [policeAreaCommand, setPoliceAreaCommand] = useState("");
  const [policeDistrict, setPoliceDistrict] = useState("");

  const [verificationSent, setVerificationSent] = useState(false);


  const userNameUpdate = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setUserEmail(value);

    // Check if email matches the required domain and update the selected option accordingly
    const domainPattern = /@police\.nsw\.gov\.au$/i;
    setSelectedOption(domainPattern.test(value) ? "police_user" : "");
  };

  const passwordUpdate = (event) => {
    setUserPassword(event.target.value);
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

  useEffect(() => {
    validateEmail();
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail();

    const formData = {
      name: userName,
      email: userEmail,
      password: userPassword,
      stationName: stationName,
      policeAreaCommand: policeAreaCommand,
      policeDistrict: policeDistrict,
    };

    // delay so render appears after email has been sent
    setTimeout(() => {
        setVerificationSent(true);
    }, 2000);

    
    //add db url
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          // form submission successful, render component
          verificationSent(true);
        } else if (response.status === 400) {
          // email already exists
          setError("Email address is already associated with an account. Please login instead.");
        }
        else {
            setError("An error occurred during form submission. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred and your registration could not be submitted. Please try again.");
      });
  };

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
              onChange={stationNameUpdate}
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
              onChange={policeAreaCommandUpdate}
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
              onChange={policeDistrictUpdate}
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
                onChange={userNameUpdate}
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
                onChange={passwordUpdate}
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
        return (
        <div className="font-main flex justify-center text-center text-lg md:text-2xl">
            <p className="">A verification link has been sent to your email! Please confirm to verify your account.</p>
        </div>
        );
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