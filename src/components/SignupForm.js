import React, { useState, useEffect } from "react";

export function SignupForm() {
  const [selectedOption, setSelectedOption] = useState(null)
//   const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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
          // form submission successful
          alert("You have been added to the system!");
        } else {
          // form submission failed
          alert("Failed to add user to the system.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during form submission. Please try again.");
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
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="signup-name"
                type="text"
                name="user_name"
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
                id="signup-email"
                type="email"
                name="user_email"
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
                id="signup-password"
                type="password"
                name="user_password"
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
            <div className="flex items-center justify-center">
            <input
                className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
                type="submit"
                value="Sign Up"
            />
            </div>
        </form>
        );
    };
  

    const renderVerificationSentMessage = () => {
        return (
        <div className="font-main font-bold flex justify-center text-2xl pb-8 pt-8">
            <p>Your email verification has been sent! Please confirm to verify your account.</p>
        </div>
        );
    };

    return (
        <div>
        <div className="font-main font-bold flex justify-center text-2xl pb-8 pt-8">
            <p>Become a Member</p>
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