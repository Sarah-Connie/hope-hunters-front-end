import React, { useState } from "react";
import SuccessMsg from "./SuccessMsg";
import axios from "../api/axios";

export function NewMPForm() {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [ageNumber, setAgeNumber] = useState("");
  const [ageMeasurement, setAgeMeasurement] = useState("");
  const [dateLastSeen, setDateLastSeen] = useState("");
  const [currentAgeNumber, setCurrentAgeNumber] = useState("");
  const [currentAgeMeasurement, setCurrentAgeMeasurement] = useState("");
  const [areaSuspectedToBe, setAreaSuspectedToBe] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationPostcode, setLocationPostcode] = useState("");
  const [hairColour, setHairColour] = useState("");
  const [eyeColour, setEyeColour] = useState("");
  const [complexion, setComplexion] = useState("");
  const [heightNumber, setHeightNumber] = useState("");
  const [heightMeasurement, setHeightMeasurement] = useState("");
  const [weightNumber, setWeightNumber] = useState("");
  const [weightMeasurement, setWeightMeasurement] = useState("");
  const [gender, setGender] = useState("");
  const [distinctiveFeatures, setDistinctiveFeatures] = useState("");
  const [amberAlert, setAmberAlert] = useState(false);
  const [verifySent, setVerifySent] = useState(false);
  const [error, setError] = useState("");


  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new missing person object
    const newMissingPerson = {
      fullName: fullName,
      photoURL: photoURL,
      ageNumber: ageNumber,
      ageType: ageMeasurement,
      dateLastSeen: dateLastSeen,
      currentAgeNumber: currentAgeNumber,
      currentAgeType: currentAgeMeasurement,
      areaSuspectedToBe: areaSuspectedToBe,
      address: locationAddress,
      city: locationCity,
      state: locationState,
      postcode: locationPostcode,
      hairColour: hairColour,
      eyeColour: eyeColour,
      complexion: complexion,
      heightNumber: heightNumber,
      heightMeasurement: heightMeasurement,
      weightNumber: weightNumber,
      weightMeasurement: weightMeasurement,
      gender: gender,
      distinctiveFeatures: distinctiveFeatures,
      amberAlert: amberAlert
    };

    // Send the updated missing person data to the backend for updating
    try {
      const authToken = `Bearer ${sessionStorage.getItem("token")}`;
      console.log("auth Token:", authToken);

      const response = await axios.post("/missing/new", newMissingPerson, {
        headers: {
          authorization: authToken,
          // Authorization: authToken,
        },
      });

      if (response.status === 200) {
        // Form submission successful, render success message
        setVerifySent(true);

        // Reset the form fields
        setFullName("");
        setPhotoURL("");
        setAgeNumber("");
        setAgeMeasurement("");
        setDateLastSeen("");
        setCurrentAgeNumber("");
        setCurrentAgeMeasurement("");
        setAreaSuspectedToBe("");
        setLocationAddress("");
        setLocationCity("");
        setLocationState("");
        setLocationPostcode("");
        setHairColour("");
        setEyeColour("");
        setComplexion("");
        setHeightNumber("");
        setHeightMeasurement("");
        setWeightNumber("");
        setWeightMeasurement("");
        setGender("");
        setDistinctiveFeatures("");
        setAmberAlert(false);

      } else if (response.status === 400) {
        setError("Report could not be saved. Please try again later.");
        setVerifySent(false);
      } else {
        console.error("Failed to save the report to the system.");
        setError("Updated details could not be saved. Please try again.");
        setVerifySent(false);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Handle server response errors
        const responseData = error.response.data;
        if (responseData && responseData.error) {
          setError(responseData.error);
          setVerifySent(false);
        }
      } else {
        setError("An error occurred during form submission. Please try again.");
        setVerifySent(false);
      }
    }

    // // delay so render appears after form has been successfully "sent" to backend
    // setTimeout(() => {
    //   setVerifySent(true);
    // }, 2000);
  
  };

  const newMPForm = () => {
  return (
    <div>
      <p className="flex justify-center w-full font-main font-semibold text-2xl my-4 lg:ml-3">New Missing Person Report</p>
      <form className="flex flex-col w-full font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 lg:ml-3"
      onSubmit={handleSubmit}>
        <div className="flex justify-center font-main italic text-xl pb-4">General Information</div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="fullName">Full Name:</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mb-2 lg:mb-4 lg:space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1"
          htmlFor="ageNumber">Age: </label>
          <input
            className="shadow appearance-none border rounded mb-2 md:mb-0 w-2/5 lg:w-1/6 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="ageNumber"
            value={ageNumber}
            min={1}
            max={110}
            onChange={(e) => setAgeNumber(e.target.value)}
            required
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="ageMeasurement">Unit:</label>
          <select
            className="shadow appearance-none border rounded w-full md:w-2/5 lg:w-24 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ageMeasurement"
            value={ageMeasurement}
            onChange={(e) => setAgeMeasurement(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="hour">hour</option>
            <option value="hours">hours</option>
            <option value="day">day</option>
            <option value="days">days</option>
            <option value="week">week</option>
            <option value="weeks">weeks</option>
            <option value="month">month</option>
            <option value="months">months</option>
            <option value="year">year</option>
            <option value="years">years</option>
          </select>
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="gender">Gender:</label>
          <input
            className="mb-2 md:mb-0 shadow appearance-none border rounded w-28 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="flex flex-row mb-2 md:mb-4 space-x-4 mt-2 lg:mt-0">
          <label className="flex items-center text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="dateLastSeen">Date Last Seen:</label>
          <input
            className="shadow appearance-none border rounded lg:w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            id="dateLastSeen"
            value={dateLastSeen}
            max={currentDate}
            onChange={(e) => setDateLastSeen(e.target.value)}
          />
          <label className="flex items-center text-gray-700 text-sm font-bold mb-1"
          htmlFor="amberAlert">Amber Alert:</label>
          <input
            className="mt-1 h-10 w-10 md:h-6 md:w-6 rounded-md border-gray-400 focus:ring-blue-500 focus:border-blue-500 text-blue-500"
            type="checkbox"
            id="amberAlert"
            checked={amberAlert}
            onChange={(e) => setAmberAlert(e.target.checked)}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mb-2 lg:mb-4 lg:space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="currentAgeNumber">Current Age:</label>
          <input className="shadow appearance-none border rounded w-2/5 lg:w-1/5 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="currentAgeNumber"
            value={currentAgeNumber}
            min={1}
            max={110}
            onChange={(e) => setCurrentAgeNumber(e.target.value)}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="currentAgeMeasurement">Unit of Time:</label>
          <select
            className="shadow appearance-none border rounded w-40 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="currentAgeMeasurement"
            value={currentAgeMeasurement}
            onChange={(e) => setCurrentAgeMeasurement(e.target.value)}
            required={currentAgeNumber !== ''}
          >
            <option value="">Select an option</option>
            <option value="hour">hour</option>
            <option value="hours">hours</option>
            <option value="day">day</option>
            <option value="days">days</option>
            <option value="week">week</option>
            <option value="weeks">weeks</option>
            <option value="month">month</option>
            <option value="months">months</option>
            <option value="year">year</option>
            <option value="years">years</option>
          </select>
        </div>
        <div className="flex justify-center font-main italic text-xl py-4">Geographic Information</div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="areaSuspectedToBe">Area Suspected To Be:</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="areaSuspectedToBe"
            value={areaSuspectedToBe}
            onChange={(e) => setAreaSuspectedToBe(e.target.value)}
          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="locationAddress">Address Last Seen:</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="locationAddress"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="locationCity">City Last Seen:</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="locationCity"
            value={locationCity}
            onChange={(e) => setLocationCity(e.target.value)}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mb-2 lg:mb-4 lg:space-x-2">
          <label className="text-gray-700 text-sm font-bold mb-1 md:mb-2 flex items-center"
          htmlFor="locationPostcode">Postcode Last Seen:</label>
          <input
            className="mr-2 shadow appearance-none border rounded w-2/5 lg:w-1/6 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="locationPostcode"
            value={locationPostcode}
            onChange={(e) => setLocationPostcode(e.target.value)}
            minLength={4}
            maxLength={4}
            required
          />
          <label className="text-gray-700 text-sm font-bold mb-1 lg:pl-4 flex lg:items-center mt-2 lg:mt-0"
          htmlFor="locationState">State Last Seen:</label>
          <select
            className="shadow appearance-none border rounded w-40 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="locationState"
            value={locationState}
            onChange={(e) => setLocationState(e.target.value)}
          >
            <option value="">Select a State</option>
            <option value="NSW">NSW</option>
            <option value="QLD">QLD</option>
            <option value="VIC">VIC</option>
            <option value="TAS">TAS</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
            <option value="NT">NT</option>
            <option value="ACT">ACT</option>
          </select>
        </div>
        <div className="flex justify-center font-main italic text-xl py-4">Appearance</div>
        <div className="flex flex-col lg:items-center lg:flex-row mb-2 lg:mb-4 lg:space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1"
          htmlFor="hairColour">Hair Colour:</label>
          <input
            className="shadow appearance-none border rounded w-2/5 md:w-36 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="hairColour"
            value={hairColour}
            onChange={(e) => setHairColour(e.target.value)}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="eyeColour">Eye Colour:</label>
          <input
            className="shadow appearance-none border rounded w-2/5 md:w-36 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="eyeColour"
            value={eyeColour}
            onChange={(e) => setEyeColour(e.target.value)}
          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="complexion">Complexion:</label>
          <select
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="complexion"
            value={complexion}
            onChange={(e) => setComplexion(e.target.value)}
          >
            <option value="">Select a complexion</option>
            <option value="sallow">sallow</option>
            <option value="fair">fair</option>
            <option value="pale">pale</option>
            <option value="tanned">tanned</option>
            <option value="olive">olive</option>
            <option value="freckled">freckled</option>
            <option value="ruddy">ruddy</option>
            <option value="sunburned">sunburned</option>
            <option value="medium">medium</option>
            <option value="dark">dark</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div className="flex flex-col lg:flex-row mb-2 lg:mb-4 lg:space-x-4 lg:items-center">
          <label className="text-gray-700 text-sm font-bold mb-1"
          htmlFor="heightNumber">Height (cm): </label>
          <input
            className="shadow appearance-none border rounded w-2/5 lg:w-20 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="heightNumber"
            value={heightNumber}
            min={1}
            onChange={(e) => setHeightNumber(e.target.value)}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0 flex items-center"
          htmlFor="weightNumber">Weight: </label>
          <input
            className="shadow appearance-none border rounded w-2/5 lg:w-20 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="weightNumber"
            value={weightNumber}
            min={1}
            onChange={(e) => setWeightNumber(e.target.value)}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0 flex items-center"
          htmlFor="weightMeasurement">Unit:</label>
            <select 
            className="shadow appearance-none border rounded w-54 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weightMeasurement" 
            value={weightMeasurement}  
            onChange={(e) => setWeightMeasurement(e.target.value)}
            required={weightNumber !== ''}
            >
                <option value="">Select an Option</option>
                <option value="kilograms">Kilograms</option>
                <option value="grams">Grams</option>
            </select>
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="distinctiveFeatures">Distinctive Features:</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="distinctiveFeatures"
            value={distinctiveFeatures}
            onChange={(e) => setDistinctiveFeatures(e.target.value)}
          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="photoURL">Upload Photo (optional):</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>
        {error && (
            <p className="text-red-500 text-sm mb-2 md:mb-4">{error}</p>
        )}
        <div className="flex items-center justify-center mt-2">
            <button 
                className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
                type="submit">Submit Report
            </button>
        </div>
      </form>
    </div>
  )}

  // const renderSuccessMessage = () => {
  //     return (
  //     <div className="font-main flex justify-center text-center text-lg md:text-2xl">
  //         <p className="w-1/2">Thank you. <br/><br/> Your missing person report has successfully been submitted.</p>
  //     </div>
  //     );
  //     };

  return (
      <div>
          {verifySent ? (
              <SuccessMsg message={"Thank you. Your missing person report has successfully been submitted."} />
          ) : (
              newMPForm()
          )}
      </div>
    );

};



export default NewMPForm;