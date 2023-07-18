import RenderFormButton from "../components/RenderFormButton";
import UpdateUserForm from "../components/UpdateUserDetailsForm";
import UpdateMPForm from "../components/UpdateMPForm";
import { useState, useEffect } from "react";
import NewMPForm from "../components/NewMPForm";
import { useMediaQuery } from "react-responsive";

// mock data array
const data = [
  {
    reportId: 1,
    fullName: "Keira Janssen",
    photoURL:
      "https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=1024x1024&w=is&k=20&c=Gb9C49IRPKG88Jahy5-QgyD34G9OEPwtBpr9LwT3KUw=",
    ageNumber: 28,
    ageMeasurement: "years",
    dateLastSeen: Date.now() - 2,
    // dateLastSeen: new Date().toISOString().split("T")[0],
    currentAgeNumber: 28,
    currentAgeMeasurement: "years",
    areaSuspectedToBe: "Mount Foster",
    locationLastSeen: {
      address: "84 Arthur Street",
      city: "Mount Foster",
      state: "NSW",
      postcode: "2824",
    },
    hairColour: "brown",
    eyeColour: "brown",
    complexion: "fair",
    heightNumber: 165,
    heightMeasurement: "centimeters",
    weightNumber: 75,
    weightMeasurement: "kilograms",
    gender: "female",
    amberAlert: true,
    distinctiveFeatures: "flower tattoo left shoulder",
  },
  {
    reportId: 2,
    fullName: "Holly Smith",
    photoURL:
      "https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=1024x1024&w=is&k=20&c=Gb9C49IRPKG88Jahy5-QgyD34G9OEPwtBpr9LwT3KUw=",
    ageNumber: 28,
    ageMeasurement: "years",
    dateLastSeen: new Date().toISOString().split("T")[0],
    currentAgeNumber: 28,
    currentAgeMeasurement: "years",
    areaSuspectedToBe: "Mount Foster",
    locationLastSeen: {
      address: "84 Arthur Street",
      city: "Mount Foster",
      state: "NSW",
      postcode: "2824",
    },
    hairColour: "brown",
    eyeColour: "brown",
    complexion: "fair",
    heightNumber: 165,
    heightMeasurement: "centimeters",
    weightNumber: 75,
    weightMeasurement: "kilograms",
    gender: "female",
    distinctiveFeatures: "flower tattoo left shoulder",
  },
];


export function Dashboard() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(isMdScreenOrLarger);
  const [deleteAccount, setDeleteAccount] = useState(false)

  // const [error, setError] = useState("");

  const handleUpdateReportButtonClick = (reportId) => {
    const report = reports.find((report) => report.reportId === reportId);
    if (report) {
      setSelectedReport(report);

      setShowUpdateAccountForm(false);
      setShowUpdateReportForm(true);
      setShowNewReportForm(false);
    }
  };

  // not functional as intended
  // func body for UI development
  const handleDeleteReportButtonClick = (reportId) => {
    const report = reports.find((report) => report.reportId === reportId);
    if (report) {
      setSelectedReport(report);

      setShowUpdateAccountForm(false);
      setShowUpdateReportForm(true);
      setShowNewReportForm(false);
    }
  };

  const handleNewMPReportButtonClick = () => {
    setShowUpdateAccountForm(false);
    setShowUpdateReportForm(false);
    setShowNewReportForm(true);
  }

  const handleUpdateDetailsButtonClick = () => {
    setShowUpdateAccountForm(true);
    setShowUpdateReportForm(false);
    setShowNewReportForm(false);
    setDeleteAccount(false);
  }

  const handleDeleteAccountButtonClick = () => {
    setShowUpdateAccountForm(false);
    setShowUpdateReportForm(false);
    setShowNewReportForm(false);
    setDeleteAccount(true);
  }
  
  useEffect(() => {
    setReports(data);
  }, []);

  // updated useEffect from above
  // replace above with below
  // run fetch func onmount to get reports for the logged-in user and store in state
  //   useEffect(() => {
  //     fetchReports()
  //       .then((data) => {
  //         setReports(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching reports:", error);
  //         setError(error);
  //       });
  //   }, []);

  // api call to fetch all reports for the logged-in user
  // add db url
  // const fetchReports = async () => {
  //   const response = await fetch(""); 
  //   const data = await response.json();
  //   return data;
  // };

  return (
    <div>
      <div className="flex justify-center text-center font-main font-bold text-3xl pt-4">
        {/* Hi {existingMPData.fullName},<br /> Welcome back to your Dashboard. */}
      </div>

      {isMdScreenOrLarger ? (
        <div className="md:p-4 lg:p-2 grid grid-cols-2 gap-4 space-x-5">
          {/* <div className="col-span-1 mr-5"> */}
          <div>
            {showUpdateAccountForm && <UpdateUserForm />}
            {showUpdateReportForm && <UpdateMPForm existingMPData={selectedReport} />}
            {showNewReportForm && <NewMPForm />}
          </div>

          {/* <div className="col-span-1 flex flex-col"> */}
            {/* <div className="flex flex-row space-x-5 mb-4 mr-5"> */}
              <div className="flex flex-col p-2">
                {reports.map((report) => (
                  <div className="mt-5" 
                  key={report.reportId}
                  >
                    <div className="flex flex-row">
                        <div className="aspect-w-1 aspect-h-1">
                          <img src={report.photoURL} alt="Missing Person" className="h-52 w-52 object-cover" />
                        </div>
                        <div className="flex flex-col font-main pl-4">
                            <p className="text-2xl">{report.fullName}</p>
                            <p>{report.ageNumber} {report.ageMeasurement} old</p>
                            <p>Last Seen: {new Date (report.dateLastSeen).toISOString().split("T")[0]}</p>
                            <p>Location Last Seen: {report.locationLastSeen.address}</p>
                        </div>
                    </div>
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
                  {!deleteAccount && (
                    <RenderFormButton
                      onClick={handleDeleteAccountButtonClick}
                      buttonText="Delete Account"
                    />
                  )}
                  </div>
                </div>
                </div>
      ) : (
        <div className="p-4">
          <div className="flex w-1/2 space-x-1">
            {!showNewReportForm && (
              <RenderFormButton
                onClick={() => setShowNewReportForm(true)}
                buttonText="File New Report"
              />
            )}
          </div>
          <div>
            {showUpdateAccountForm && <UpdateUserForm />}
            {showUpdateReportForm && <UpdateMPForm existingMPData={selectedReport}/>}
            {showNewReportForm && <NewMPForm />}
          </div>
          <div>
            {reports.map((report) => (
              <div key={report.reportId}>
                <p>{report.fullName}</p>
                <p>{report.ageNumber}</p>
                <RenderFormButton
                  onClick={() => handleUpdateReportButtonClick(report.reportId)}
                  buttonText="Update Report"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row relative space-x-1">
            {!showUpdateAccountForm && (
              <RenderFormButton
                onClick={handleUpdateDetailsButtonClick}
                buttonText="Update Account"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
