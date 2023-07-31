import React, { useState, useEffect } from "react";
import SuccessMsg from "./SuccessMsg";
import axios from "../api/axios";
import { useAuth } from "./AuthContext";

export function UpdateMPForm({existingMPData}) {
  const [formValues, setFormValues] = useState(existingMPData);
  const [verifySent, setVerifySent] = useState(false);
  const [selectedReport, setSelectedReport] = useState(existingMPData);
  const [error, setError] = useState("");

  // const { user } = useAuth();
  
  // added so that error reloads when the existing MP data changes
  useEffect(() => {
    setError();
    // console.log(existingMPData)
  }, [existingMPData]);

  useEffect(() => {
    setFormValues(existingMPData);
  }, [existingMPData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (name.includes(".")) {
        const [parentKey, childKey] = name.split(".");
        setFormValues((prevValues) => ({
          ...prevValues,
          [parentKey]: {
            ...prevValues[parentKey],
            [childKey]: value,
          },
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
  };

  const currentDate = new Date().toISOString().split("T")[0];


  const handleSubmit = async (event) => {
  event.preventDefault();  

  // Get the authentication token from session
  const authToken = `Bearer ${sessionStorage.getItem("token")}`;

  // Get the reportId from the selectedReport object
  const reportId = selectedReport._id;

  // Send the updated missing person data to the backend for updating
  try {
    const response = await axios.put(`/missing/update/${reportId}`, formValues, {
      headers: {
        Authorization: authToken,
      },
    });

    if (response.status === 200) {
      // Form submission successful, render success message
      setFormValues({});
      setVerifySent(true);
    } else if (response.status === 400) {
      setError("Update could not be completed. Please try again later.");
    } else {
      console.error("Failed to update the report.");
      setError("Updated details could not be saved. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      // Handle server response errors
      const responseData = error.response.data;
      if (responseData && responseData.error) {
        setError(responseData.error);
      }
    } else {
      setError("An error occurred during the update. Please try again.");
    }
  }
};

  const updateMPForm = () => {
    return (
      <div>
        <p className="flex justify-center w-full font-main font-semibold text-2xl my-4 md:ml-5">Update Missing Person Report</p>
        <form className="flex flex-col w-full font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-2 mb-4 md:ml-5" onSubmit={handleSubmit}>
          <div className="mb-2 md:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2" htmlFor="fullName">Full Name:</label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="fullName"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              required
            />
          </div>
        <div className="flex flex-col lg:flex-row lg:items-center mb-2 lg:mb-4 lg:space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1"
          htmlFor="ageNumber">Age: </label>
          <input
            className="shadow appearance-none border rounded mb-2 md:mb-0 w-2/5 lg:w-1/6 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="ageNumber"
            id="ageNumber"
            value={formValues.ageNumber}
            min={1}
            max={110}
            onChange={handleChange}
            required
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="ageMeasurement">Unit:</label>
          <select
            className="shadow appearance-none border rounded w-full md:w-2/5 lg:w-24 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ageMeasurement"
            name="ageMeasurement"
            value={formValues.ageMeasurement}
            onChange={handleChange}
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
            name="gender"
            value={formValues.gender || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row mb-2 md:mb-4 space-x-4 mt-2 lg:mt-0">
          <label className="flex items-center text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="dateLastSeen">Date Last Seen:</label>
          <input
            className="shadow appearance-none border rounded lg:w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            id="dateLastSeen"
            name="dateLastSeen"
            // value={formValues.dateLastSeen || ""}
            value={formValues.dateLastSeen ? new Date(formValues.dateLastSeen).toISOString().split("T")[0] : ""}
            max={currentDate}
            onChange={handleChange}
          />
          <label className="flex items-center text-gray-700 text-sm font-bold mb-1"
          htmlFor="amberAlert">Amber Alert:</label>
          <input
            className="mt-1 h-10 w-10 md:h-6 md:w-6 rounded-md border-gray-400 focus:ring-blue-500 focus:border-blue-500 text-blue-500"
            type="checkbox"
            id="amberAlert"
            name="amberAlert"
            checked={formValues.amberAlert || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mb-2 lg:mb-4 lg:space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="currentAgeNumber">Current Age:</label>
          <input className="shadow appearance-none border rounded w-2/5 lg:w-1/5 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="currentAgeNumber"
            name="currentAgeNumber"
            value={formValues.currentAgeNumber}
            min={1}
            max={110}
            onChange={handleChange}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="currentAgeMeasurement">Unit of Time:</label>
          <select
            className="shadow appearance-none border rounded w-40 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="currentAgeMeasurement"
            name="currentAgeMeasurement"
            value={formValues.currentAgeMeasurement || ""}
            onChange={handleChange}
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
            name="areaSuspectedToBe"
            value={formValues.areaSuspectedToBe || ""}
            onChange={handleChange}

          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="locationAddress">Address Last Seen:</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="locationLastSeen.address"
            name="locationLastSeen.address"
            value={formValues.locationLastSeen.address || ""}
            onChange={handleChange}

          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="locationCity">City Last Seen:</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="locationLastSeen.city"
            name="locationLastSeen.city"
            value={formValues.locationLastSeen.city || ""}
            onChange={handleChange}

          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mb-2 lg:mb-4 lg:space-x-2">
          <label className="text-gray-700 text-sm font-bold mb-1 md:mb-2 flex items-center"
          htmlFor="locationPostcode">Postcode Last Seen:</label>
          <input
            className="mr-2 shadow appearance-none border rounded w-2/5 lg:w-1/6 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="locationLastSeen.postcode"
            name="locationLastSeen.postcode"
            value={formValues.locationLastSeen.postcode || ""}
            onChange={handleChange}
            minLength={4}
            maxLength={4}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 lg:pl-4 flex lg:items-center mt-2 lg:mt-0"
          htmlFor="locationState">State Last Seen:</label>
          <select
            className="shadow appearance-none border rounded w-40 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="locationLastSeen.state"
            name="locationLastSeen.state"
            value={formValues.locationLastSeen.state || ""}
            onChange={handleChange}
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
            name="hairColour"
            value={formValues.hairColour || ""} 
            onChange={handleChange}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0"
          htmlFor="eyeColour">Eye Colour:</label>
          <input
            className="shadow appearance-none border rounded w-2/5 md:w-36 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="eyeColour"
            name="eyeColour"
            value={formValues.eyeColour || ""}
            onChange={handleChange}

          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="complexion">Complexion:</label>
          <select
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="complexion"
            name="complexion"
            value={formValues.complexion || ""}
            onChange={handleChange}

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
            name="height.number"
            value={formValues.height?.number || ""}
            min={1}
            onChange={handleChange}
          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0 flex items-center"
          htmlFor="weightNumber">Weight: </label>
          <input
            className="shadow appearance-none border rounded w-2/5 lg:w-20 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="weightNumber"
            name="weight.number"
            value={formValues.weight?.number || ""}
            min={1}
            onChange={handleChange}

          />
          <label className="text-gray-700 text-sm font-bold mb-1 mt-2 lg:mt-0 flex items-center"
          htmlFor="weightMeasurement">Unit:</label>
            <select 
            className="shadow appearance-none border rounded w-54 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weightMeasurement" 
            name="weightMeasurement" 
            value={formValues.weightMeasurement || ""}  
            onChange={handleChange}
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
            name="distinctiveFeatures"
            value={formValues.distinctiveFeatures || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
          htmlFor="photoURL">Upload Photo (optional):</label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="photoURL"
            name="photoURL"
            value={formValues.photoURL || ""}
            onChange={handleChange}
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
    );
  };

  return (
    <div>
      {verifySent ? (
        <SuccessMsg message={"Thank you. Your missing person report has been successfully updated."} />
      ) : (
        updateMPForm()
      )}
    </div>
  );
}

export default UpdateMPForm;
