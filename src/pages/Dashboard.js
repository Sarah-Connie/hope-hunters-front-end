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
import SuccessMsg from "../components/SuccessMsg";
import DashboardSearchBar from "../components/DashboardSearchbar";


export function Dashboard() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(isMdScreenOrLarger);

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [showDeleteReportConfirmation, setShowDeleteReportConfirmation] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [originalReports, setOriginalReports] = useState([]);

  const { logout, user } = useAuth();
  // const isPoliceUser = sessionStorage.getItem(user.police);
  // const isAdmin = sessionStorage.getItem(user.admin);
  const userType = user && (!user.police && !user.admin) ? 'general' : 'police/admin';
  const apiEndpoint = userType === 'general' ? '/users/search' : '/missing/search';
  
   
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

  // run the api call when reports get updated
   useEffect(() => {
    fetchMissingPersonsData();
  }, []);

  // // store the returned reports on mount
  // useEffect(() => {
  //   setReports(reports);
  // }, []);


  // // store the returned reports anytime the reports change
  // // will show live when a user adds, deletes, or updates a report
  // useEffect(() => {
  //   setReports(reports);
  //   // setOriginalReports(reports)
  // }, [reports]);

  // determine which forms/buttons and report to show when 'update report' is clicked
  const handleUpdateReportButtonClick = (reportId) => {
    const report = reports.find((report) => report._id === reportId);
    if (report) {
      setSelectedReport(report);
      setShowUpdateAccountForm(false);
      setShowUpdateReportForm(true);
      setShowNewReportForm(false);
    }
  };


  const handleDeleteReportButtonClick = (reportId) => {
    const report = reports.find((report) => report._id === reportId);
    if (report) {
      setSelectedReport(report);
      setShowUpdateAccountForm(false);
      setShowUpdateReportForm(false);
      setShowNewReportForm(false);
      setDeleteAccount(false);
      setShowDeleteReportConfirmation(true); // Show the new confirmation window for deleting the report
      setError(""); // Clear any previous errors
    }
  };

  const handleConfirmDeleteReport = async () => {
    try {
      if (selectedReport) {
        const reportId = selectedReport._id;
        const authToken = `Bearer ${sessionStorage.getItem('token')}`;
        const response = await axios.delete(`/missing/delete/${reportId}`, {
        headers: {
          Authorization: authToken,
        },
      });

      if (response.status === 200) {
        console.log("Report successfully deleted.")
        setShowDeleteReportConfirmation(false);
        setShowNewReportForm(true);
        fetchMissingPersonsData();
        
      } else if (response.status === 404){
        // Handle deletion failure
        setDeletionError("Deletion unsuccessful.")
        console.error('Failed to delete account:', response.data.error);
      }
    } 
  }
    catch (error) {
      setDeletionError("Unable to delete the report at this time. Please try again later.")
      console.error('Error:', error);
    }
    // setShowDeleteReportConfirmation(false); // Close the new confirmation window regardless of success or failure
  };
  
  const handleCancelDeleteReport = () => {
    setShowDeleteReportConfirmation(false);
    setShowNewReportForm(true);
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
  const handleConfirmAccountDelete = async () => {
    try {
      // const authToken = `Bearer ${sessionStorage.getItem('token')}`;
      const response = await axios.delete('/users/delete', {
        headers: {
          Authorization: authToken,
        },
      });

      if (response.status === 200) {
        // Account deleted successfully
        console.log("Account successfully deleted.")
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
  const handleCancelAccountDelete = () => {
    setShowConfirmation(false);
    setShowNewReportForm(true);
  };

  // Callback function to update reports based on search result
  const handleSearchResult = (searchResult) => {
    setReports(searchResult);
    setError(''); // Clear the search error when a new search is performed
  };

  const handleClearSearch = () => {
    // Set the "reports" state back to the original list from api call
    setReports(originalReports);
    setError('');
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
            {originalReports.length >= 4 && userType === "general" && (
                <DashboardSearchBar
                  onSearchResult={handleSearchResult}
                  reports={reports}
                  originalReports={originalReports}
                />
            )}
            {userType !== "general" && (
                <DashboardSearchBar
                  onSearchResult={handleSearchResult}
                  reports={reports}
                  originalReports={originalReports}
                />
            )}
            {showUpdateAccountForm && <UpdateUserForm />}
            {showUpdateReportForm && <UpdateMPForm existingMPData={selectedReport} fetchAllReports={fetchMissingPersonsData}/>}
            {showNewReportForm && <NewMPForm fetchAllReports={fetchMissingPersonsData}/>}
          </div>
          {/* reports container */}
          <div className="flex flex-col">
          <p className="flex justify-center font-main font-semibold text-3xl pt-3">Your Active Reports</p>
            {error && (
                <p className="mt-10 flex justify-center text-center italic text-red-500 text-xl mb-4">{error}</p>
            )}
            {reports.length === 0 && !error && (
              <p className="m-5 w-full flex justify-center text-blue text-xl md:text-2xl ml-3 italic">
                No missing persons reports found.
              </p>
            )}
            {/* report rendering */}
                {reports.map((report) => (
                  <div className="mt-5 mb-3"  
                  key={report._id}
                  >
                    <div className={`flex flex-col p-5 mb-1 rounded ${report.amberAlert ? 'bg-orange' : 'border border-blue'}`} key={report._id}>
                      <div className="flex md:flex-col md:items-center lg:flex-row">
                      <div className="aspect-w-1 aspect-h-1 flex items-start flex-grow items-center">
                            <img src={report.photoURL} alt="Missing Person" className="h-56 w-56 object-cover" />
                        </div>
                        <div className="flex flex-col space-y-.5 font-main text-md lg:pl-5 w-full lg:w-4/6 items-center">
                            <p className="text-2xl pb-2 italic">{report.fullName}</p>
                            <p>Current Age: {report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}</p>
                            <p>Age at Reported Missing: {report.age[0].number ? report.age[0].number + ' ' + report.age[0].type + ' old' : 'Unreported'}</p>
                            <p>Date Last Seen: {report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}</p>
                            <p className="pt-1">Location Last Seen - </p>
                            <p>Address Last Seen: {report.locationLastSeen.address ? (report.locationLastSeen.address) : ("Unreported")}</p>
                            <p>City Last Seen: {report.locationLastSeen.city ? (report.locationLastSeen.city) : ("Unreported")}</p>
                            {/* <p>State Last Seen: {report.locationLastSeen.state ? (report.locationLastSeen.state) : ("Unreported")}</p> */}
                            <p>{report.locationLastSeen.state ? (report.locationLastSeen.state) : ("")} {report.locationLastSeen.postcode}</p>
                            <p>Area Suspected To Be: {report.areaSuspectedToBe ? (report.areaSuspectedToBe) : ("Unreported")}</p>
                        </div>
                      </div>
                      <div className="flex flex-col font-main text-md space-y-.5">
                          <p className="text-xl font-semibold pt-2">Key Details:</p>
                          <p>Height: {report.height.number ? report.height.number + 'cm' : 'Unreported'}, Weight: {report.weight.number ? report.weight.number + ' ' + report.weight.measurement[0] : 'Unreported'}</p>
                          <p>Hair Colour: {report.hairColour ? (report.hairColour) : ("Unreported")}, Eye Colour: {report.eyeColour ? (report.eyeColour) : ("Unreported")}</p>
                          <p>Complexion: {report.complexion[0] ? (report.complexion[0]) : ("Unreported")}</p>
                          <p>Gender: {report.gender}</p>
                          <p>{report.distinctiveFeatures ? ("Distinctive Features: " + report.distinctiveFeatures) : ("No Distinct Features")}</p>
                          <p className="italic">{report.amberAlert ? "Active Amber Alert" : ""}</p>
                      </div>
                    </div>
                    {/* report buttons */}
                    <div className="flex space-x-4 pt-2">
                    <RenderFormButton
                      onClick={() => handleUpdateReportButtonClick(report._id)}
                      buttonText="Update Report"
                    />
                    <RenderFormButton
                      onClick={() => handleDeleteReportButtonClick(report._id)}
                      buttonText="Delete Report"
                    />
                    </div>
                </div>
                ))}
                </div>
                <div className="col-span-2 lg:col-start-2 lg:pr-4">
                  <div className="flex flex-row space-x-4 md:justify-center w-full">
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
                      onConfirm={handleConfirmAccountDelete}
                      onCancel={handleCancelAccountDelete}
                      error={deletionError}
                    />
                  )}

                  {showDeleteReportConfirmation && (
                    <ConfirmationWindow
                      message="Are you sure you want to delete this report?"
                      onConfirm={handleConfirmDeleteReport}
                      onCancel={handleCancelDeleteReport}
                      error={deletionError}
                />
              )}
                  </div>
                </div>
                </div>
      ) : (
        <div className="p-3">
          <div className="flex w-1/2 space-x-1 p-2">
            {!showNewReportForm && (
              <RenderFormButton
                onClick={() => setShowNewReportForm(true)}
                buttonText="File New Report"
              />
            )}
          </div>
          {originalReports.length >= 4 && userType === "general" && (
                <DashboardSearchBar
                  onSearchResult={handleSearchResult}
                  reports={reports}
                  originalReports={originalReports}
                />
            )}
            {userType !== "general" && (
                <DashboardSearchBar
                  onSearchResult={handleSearchResult}
                  reports={reports}
                  originalReports={originalReports}
                />
            )}
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
              {reports.length === 0 && !error && (
                <p className="m-5 w-full flex justify-center text-blue text-xl md:text-2xl ml-3 italic">
                  No missing persons reports found.
                </p>
              )}
              {reports.map((report) => (
                <div className="mt-5" key={report._id}>
                  <div className={`flex flex-col p-4 mb-3 rounded ${report.amberAlert ? 'bg-orange' : 'border border-blue'}`} key={report._id}>
                  <div className="flex flex-col items-center">
                    <div className="aspect-w-1 aspect-h-1 flex items-start flex-grow items-center">
                        <img src={report.photoURL} alt="Missing Person" 
                        // className="object-cover" 
                        className="h-40 w-40 object-cover" 
                        />
                    </div>
                    <div className="flex flex-col font-main text-sm w-full items-center">
                        <p className="text-lg pb-1">{report.fullName}</p>
                        <p>Age at Reported Missing: {report.age[0].number ? report.age[0].number + ' ' + report.age[0].type + ' old' : 'Unreported'}</p>
                        <p>Date Last Seen: {report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}</p>
                        <p>Current Age: {report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}</p>
                        <p className="pt-1">Location Last Seen - </p>
                        <p>Address Last Seen: {report.locationLastSeen.address ? (report.locationLastSeen.address) : ("Unreported")}</p>
                        <p>City Last Seen: {report.locationLastSeen.city ? (report.locationLastSeen.city) : ("Unreported")}</p>
                        <p>{report.locationLastSeen.state ? (report.locationLastSeen.state) : ("")} {report.locationLastSeen.postcode}</p>         
                        <p>Area Suspected To Be: {report.areaSuspectedToBe ? (report.areaSuspectedToBe) : ("Unreported")}</p>
                   
                <div className="flex flex-col font-main text-sm w-full">
                    <p className="text-lg font-semibold pt-2">Key Details:</p>
                    <p>Height: {report.height.number ? report.height.number + 'cm' : 'Unreported'}, Weight: {report.weight.number ? report.weight.number + ' ' + report.weight.measurement[0] : 'Unreported'}</p>
                    <p>Hair Colour: {report.hairColour ? (report.hairColour) : ("Unreported")}, Eye Colour: {report.eyeColour ? (report.eyeColour) : ("Unreported")}</p>
                    <p>Complexion: {report.complexion[0] ? (report.complexion[0]) : ("Unreported")}</p>
                    <p>Gender: {report.gender}</p>
                    <p>{report.distinctiveFeatures ? ("Distinctive Features: " + report.distinctiveFeatures) : ("No Distinct Features")}</p>
                    <p className="italic">{report.amberAlert ? "Active Amber Alert" : ""}</p>
                </div>
                </div></div>
            </div>
                  <div className="flex space-x-4 pb-3">
                    <RenderFormButton
                      onClick={() => handleUpdateReportButtonClick(report._id)}
                      buttonText="Update Report"
                    />
                    <RenderFormButton
                      onClick={() => handleDeleteReportButtonClick(report._id)}
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
                  onConfirm={handleConfirmAccountDelete}
                  onCancel={handleCancelAccountDelete}
                  error={deletionError}
                />
              )}

              {showDeleteReportConfirmation && (
                <ConfirmationWindow
                  message="Are you sure you want to delete this report?"
                  onConfirm={handleConfirmDeleteReport}
                  onCancel={handleCancelDeleteReport}
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
