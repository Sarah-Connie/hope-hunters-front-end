import RenderFormButton from "../components/RenderFormButton";
import UpdateUserForm from "../components/UpdateUserDetailsForm";
import UpdateMPForm from "../components/UpdateMPForm";
import { useState, useEffect } from "react";
import NewMPForm from "../components/NewMPForm";
import { useMediaQuery } from "react-responsive";
import axios from "../api/axios";
import ConfirmationWindow from "../components/ConfirmationWindow";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"

// // mock data array
// const data = [
//   {
//     reportId: 1,
//     fullName: "Keira Janssen",
//     photoURL:
//       "https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=1024x1024&w=is&k=20&c=Gb9C49IRPKG88Jahy5-QgyD34G9OEPwtBpr9LwT3KUw=",
//     ageNumber: 28,
//     ageMeasurement: "years",
//     dateLastSeen: Date.now() - 2,
//     // dateLastSeen: new Date().toISOString().split("T")[0],
//     currentAgeNumber: 28,
//     currentAgeMeasurement: "years",
//     areaSuspectedToBe: "Mount Foster",
//     locationLastSeen: {
//       address: "84 Arthur Street",
//       city: "Mount Foster",
//       state: "NSW",
//       postcode: "2824",
//     },
//     hairColour: "brown",
//     eyeColour: "brown",
//     complexion: "fair",
//     heightNumber: 165,
//     heightMeasurement: "centimeters",
//     weightNumber: 75,
//     weightMeasurement: "kilograms",
//     gender: "female",
//     amberAlert: true,
//     distinctiveFeatures: "flower tattoo left shoulder",
//   },
//   {
//     reportId: 2,
//     fullName: "Holly Smith",
//     photoURL:
//       "https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=1024x1024&w=is&k=20&c=Gb9C49IRPKG88Jahy5-QgyD34G9OEPwtBpr9LwT3KUw=",
//     ageNumber: 28,
//     ageMeasurement: "years",
//     dateLastSeen: new Date().toISOString().split("T")[0],
//     currentAgeNumber: 28,
//     currentAgeMeasurement: "years",
//     areaSuspectedToBe: "Mount Foster",
//     locationLastSeen: {
//       address: "84 Arthur Street",
//       city: "Mount Foster",
//       state: "NSW",
//       postcode: "2824",
//     },
//     hairColour: "brown",
//     eyeColour: "brown",
//     complexion: "fair",
//     heightNumber: 165,
//     heightMeasurement: "centimeters",
//     weightNumber: 75,
//     weightMeasurement: "kilograms",
//     gender: "female",
//     distinctiveFeatures: "flower tattoo left shoulder",
//   },
// ];

export function Dashboard() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(isMdScreenOrLarger);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [originalReports, setOriginalReports] = useState([]);

  const { logout, user } = useAuth();
   
  const [deletionError, setDeletionError] = useState("");
  const navigate = useNavigate();
  const authToken = `Bearer ${sessionStorage.getItem("token")}`;

  // api call to get all of the logged-in user's MP reports
  const fetchMissingPersonsData = async () => {
    try {
      const response = await axios.get("/users/missing/all", {
        headers: {
          Authorization: authToken,
        },
      });
  
      setReports(response.data);
      setOriginalReports(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Your report data is unavailable at this time.");
      } else {
        setError("Error fetching missing persons data. Please try again later.");
        console.error("Error fetching missing persons data:", error);
      }
    }
  };

  // run on component mount
  useEffect(() => {
    fetchMissingPersonsData();
  }, []);

  // store the returned reports on mount
  useEffect(() => {
    setReports(reports);
  }, []);

  // determine which forms/buttons to show when 'update report' is clicked
  const handleUpdateReportButtonClick = (reportId) => {
    const report = reports.find((report) => report._id === reportId);
    if (report) {
      setSelectedReport(report);
      setShowUpdateAccountForm(false);
      setShowUpdateReportForm(true);
      setShowNewReportForm(false);
    }
  };

  // not functional yet as intended
  // body for UI development
  const handleDeleteReportButtonClick = (reportId) => {
    const report = reports.find((report) => report._id === reportId);
    if (report) {
      setSelectedReport(report);

      setShowUpdateAccountForm(false);
      setShowUpdateReportForm(true);
      setShowNewReportForm(false);
    }
  };

  // determine which forms/buttons to show when 'update report' is clicked
  const handleNewMPReportButtonClick = () => {
    setShowUpdateAccountForm(false);
    setShowUpdateReportForm(false);
    setShowNewReportForm(true);
  };

  // determine which forms/buttons to show when 'update report' is clicked
  const handleUpdateDetailsButtonClick = () => {
    setShowUpdateAccountForm(true);
    setShowUpdateReportForm(false);
    setShowNewReportForm(false);
    setDeleteAccount(false);
  };

  // determine which forms/buttons to show when 'update report' is clicked
  const handleDeleteAccountButtonClick = () => {
    setShowUpdateAccountForm(false);
    setShowUpdateReportForm(false);
    setShowNewReportForm(false);
    setDeleteAccount(true);
    // to render additional confirmation window prior to acct deletion
    setShowConfirmation(true); 
  };

  // api call to delete the account
  const handleConfirmDelete = async () => {
    try {
      // const authToken = `Bearer ${sessionStorage.getItem('token')}`;
      const response = await axios.delete('/users/delete', {
        headers: {
          Authorization: authToken,
        },
      });

      if (response.status === 200) {
        // Account deleted successfully
        //"log out" user using auth
        logout(user);
      } else if (response.status === 404){
        // Handle deletion failure
        setDeletionError("Deletion unsuccessful.")
        console.error('Failed to delete account:', response.data.error);
      }
    } catch (error) {
      setDeletionError("Unable to delete your account at this time. Please try again later.")
      console.error('Error:', error);
    }

    // Close the confirmation window regardless of success or failure
    // setShowConfirmation(false);
  };

  // When user cancels account deletion
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setShowNewReportForm(true);
  };


  return (
    <div className={`${isMdScreenOrLarger ? ("p-3") : ("")}`}>
      <div className="pt-10 flex justify-center text-center font-main font-bold text-2xl md:text-3xl">
        {/* Hi {existingMPData.fullName},<br /> welcome back.*/}
        Hi, welcome back.
      </div>

      {isMdScreenOrLarger ? (
        // page container
        <div className="p-2 mt-5lg:p-2 grid grid-cols-2 gap-4 space-x-5">
          {/* forms container */}
          <div id="#">
            {showUpdateAccountForm && <UpdateUserForm />}
            {showUpdateReportForm && <UpdateMPForm existingMPData={selectedReport} />}
            {showNewReportForm && <NewMPForm />}
          </div>
          {/* reports container */}
          <div className="flex flex-col">
          <p className="flex justify-center font-main font-semibold text-3xl pt-3">Your Active Reports</p>
            {error && (
                <p className="mt-10 flex justify-center text-center italic text-red-500 text-xl mb-4">{error}</p>
            )}
            {/* report rendering */}
                {reports.map((report) => (
                  <div className="mt-5 mb-3"  
                  key={report._id}
                  >
                    <div className={`flex flex-col p-5 mb-1 rounded ${report.amberAlert ? 'bg-orange' : 'border border-blue'}`} key={report._id}>
                      <div className="flex flex-row">
                      <div className="aspect-w-1 aspect-h-1 flex items-start flex-grow items-center">
                            <img src={report.photoURL} alt="Missing Person" className="h-52 w-52 object-cover" />
                        </div>
                        <div className="flex flex-col space-y-.5 font-main text-md pl-5 w-4/6">
                            <p className="text-2xl pb-2 italic">{report.fullName}</p>
                            <p>Age at Reported Missing: {report.age[0].number ? report.age[0].number + ' ' + report.age[0].type + ' old' : 'Unreported'}</p>
                            <p>Date Last Seen: {report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}</p>
                            <p>Current Age: {report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}</p>
                            <p className="py-2">Location Last Seen - </p>
                            <p>Address Last Seen: {report.locationLastSeen.address ? (report.locationLastSeen.address) : ("Unreported")}</p>
                            <p>City Last Seen: {report.locationLastSeen.city ? (report.locationLastSeen.city) : ("Unreported")}</p>
                            <p>State Last Seen: {report.locationLastSeen.state ? (report.locationLastSeen.state) : ("Unreported")}</p>
                            <p>Area Suspected To Be: {report.areaSuspectedToBe ? (report.areaSuspectedToBe) : ("Unreported")}</p>
                        </div>
                      </div>
                      <div className="flex flex-col font-main text-md space-y-.5">
                          <p className="text-xl font-semibold pt-2">Key Details:</p>
                          <p>Height: {report.height.number ? report.height.number + ' ' + report.height.measurement[0] : 'Unreported'}</p>
                          <p>Weight: {report.weight.number ? report.weight.number[0] + ' ' + report.weight.measurement[0] : 'Unreported'}</p>
                          <p>Hair Colour: {report.hairColour ? (report.hairColour) : ("Unreported")}</p>
                          <p>Eye Colour: {report.eyeColour ? (report.eyeColour) : ("Unreported")}</p>
                          <p>Complexion: {report.complexion[0] ? (report.complexion[0]) : ("Unreported")}</p>
                          <p>Gender: {report.gender}</p>
                          <p>Amber Alert: {report.amberAlert ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    {/* report buttons */}
                    <div className="flex space-x-4 pt-2">
                    <RenderFormButton
                      onClick={() => handleUpdateReportButtonClick(report.reportId)}
                      buttonText="Update Report"
                    />
                    <RenderFormButton
                      onClick={() => handleDeleteReportButtonClick(report.reportId)}
                      buttonText="Delete Report"
                    />
                    </div>
                </div>
                ))}
                </div>
                <div className="col-span-2 lg:col-start-2 p-2">
                  <div className="flex flex-row space-x-4 md:justify-center">
                  {!showNewReportForm && (
                    <RenderFormButton
                      onClick={handleNewMPReportButtonClick}
                      buttonText="File New Report"
                    />
                  )}
                  {!showUpdateAccountForm && (
                    <RenderFormButton
                      onClick={handleUpdateDetailsButtonClick}
                      buttonText="Update Account"
                    />
                  )}
                  {(!deleteAccount || !showUpdateReportForm) &&  (
                    <RenderFormButton
                      onClick={handleDeleteAccountButtonClick}
                      buttonText="Delete Account"
                    />
                  )}

                  {showConfirmation && (
                    <ConfirmationWindow
                      message="Are you sure you want to delete your account?"
                      onConfirm={handleConfirmDelete}
                      onCancel={handleCancelDelete}
                      error={deletionError}
                    />
                  )}
                  </div>
                </div>
                </div>
      ) : (
        <div className="p-2">
          <div className="flex w-1/2 space-x-1 p-2">
            {!showNewReportForm && (
              <RenderFormButton
                onClick={() => setShowNewReportForm(true)}
                buttonText="File New Report"
              />
            )}
          </div>
          <div>
            {showUpdateAccountForm && <UpdateUserForm />}
            {showUpdateReportForm && <UpdateMPForm existingMPData={selectedReport} />}
            {showNewReportForm && <NewMPForm />}
          </div>
          <div>
            <div className="flex flex-col p-2">
              <p className="flex justify-center font-main font-semibold text-2xl pt-3">Your Active Reports</p>
              {error && (
                <p className="mt-10 mb-5 flex justify-center italic text-red-500 text-lg text-center">{error}</p>
              )}
              {reports.map((report) => (
                <div className="mt-5" key={report._id}>
                  <div className={`flex flex-col p-2 mb-3 rounded ${report.amberAlert ? 'bg-orange' : 'border border-blue'}`} key={report._id}>
                  <div className="flex flex-row">
                    <div className="aspect-w-1 aspect-h-1 flex items-start flex-grow items-center">
                        <img src={report.photoURL} alt="Missing Person" className="h-28 w-28 object-cover" />
                    </div>
                    <div className="flex flex-col font-main text-sm pl-4 w-4/6">
                        <p className="text-lg pb-1">{report.fullName}</p>
                        <p>Age at Reported Missing: {report.age[0].number ? report.age[0].number + ' ' + report.age[0].type + ' old' : 'Unreported'}</p>
                        <p>Date Last Seen: {report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}</p>
                        <p>Current Age: {report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}</p>
                        <p className="py-2">Location Last Seen - </p>
                        <p>Address Last Seen: {report.locationLastSeen.address ? (report.locationLastSeen.address) : ("Unreported")}</p>
                        <p>City Last Seen: {report.locationLastSeen.city ? (report.locationLastSeen.city) : ("Unreported")}</p>
                        <p>State Last Seen: {report.locationLastSeen.state ? (report.locationLastSeen.state) : ("Unreported")}</p>                   
                        <p>Area Suspected To Be: {report.areaSuspectedToBe ? (report.areaSuspectedToBe) : ("Unreported")}</p>
                    </div>
                </div>
                <div className="flex flex-col font-main text-sm">
                    <p className="text-lg font-semibold pt-2">Key Details:</p>
                    <p>Height: {report.height.number ? report.height.number + ' ' + report.height.measurement[0] : 'Unreported'}</p>
                    <p>Weight: {report.weight.number ? report.weight.number[0] + ' ' + report.weight.measurement[0] : 'Unreported'}</p>
                    <p>Hair Colour: {report.hairColour ? (report.hairColour) : ("Unreported")}</p>
                    <p>Eye Colour: {report.eyeColour ? (report.eyeColour) : ("Unreported")}</p>
                    <p>Complexion: {report.complexion[0] ? (report.complexion[0]) : ("Unreported")}</p>
                    <p>Gender: {report.gender}</p>
                    <p>Amber Alert: {report.amberAlert ? "Yes" : "No"}</p>
                </div>
            </div>
                  <div className="flex space-x-4 pb-3">
                    <RenderFormButton
                      onClick={() => handleUpdateReportButtonClick(report.reportId)}
                      buttonText="Update Report"
                    />
                    <RenderFormButton
                      onClick={() => handleDeleteReportButtonClick(report.reportId)}
                      buttonText="Delete Report"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row relative space-x-4 p-2">
              {!showUpdateAccountForm && (
                <RenderFormButton
                  onClick={handleUpdateDetailsButtonClick}
                  buttonText="Update Account"
                />
              )}
              {(!deleteAccount || !showUpdateReportForm) &&  (
                <RenderFormButton
                  onClick={handleDeleteAccountButtonClick}
                  buttonText="Delete Account"
                />
              )}

              {showConfirmation && (
                <ConfirmationWindow
                  message="Are you sure you want to delete your account?"
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancelDelete}
                  error={deletionError}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
