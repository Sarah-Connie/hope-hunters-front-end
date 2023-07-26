import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export function Home() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  // code this to open the report in the update report form on dashboard page 
  // (edit button only shows when users are logged in, so no need to check that twice)
  const handleEditReportButtonClick = (reportId) => {
    const report = reports.find((report) => report.reportId === reportId);
    if (report) {
      navigate("/dashboard")
    }
  };

//   useEffect(() => {
//     setReports(data);
//   }, []);

  useEffect(() => {
    // Fetch the missing persons data from the API endpoint
    axios.get("/missing/")
      .then((response) => {
        // Set the fetched data to the "reports" state
        setReports(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching missing persons data:", error);
        // Handle errors if necessary
      });
  }, []);

  return (
    <div>
      <div className="mt-16 flex justify-center text-center font-main font-bold text-2xl md:text-3xl">
        Currently Active Reports
      </div>
      {isMdScreenOrLarger ? (
        <div className="p-4 mt-5 lg:p-2 gap-4 w-full flex flex-wrap justify-center justify-around md:text-center">
          {reports.map((report) => (
            <div className="flex flex-row p-2" key={report._id}>
              <div className="mt-5">
                <div className="flex flex-col">
                  <div className="aspect-w-1 aspect-h-1 justify-center flex">
                    <img src={report.photoURL} alt="Missing Person" className="md:h-52 md:w-52 lg:h-64 lg:w-64 object-cover" />
                  </div>
                  <div className="flex flex-col font-main">
                    <p className="text-2xl pt-1">{report.fullName}</p>
                    <p>{report.currentAge[0].number} {report.currentAge[0].type} old</p>
                    <p>Height: {report.height.number} {report.height.measurement[0]}</p>
                    <p>Weight: {report.weight.number} {report.weight.measurement[0]}</p>
                    <p>Last Seen: {new Date(report.dateLastSeen).toISOString().split("T")[0]}</p>
                    <p>Location Last Seen: {report.locationLastSeen.address}, <br/>{report.locationLastSeen.city}, {report.locationLastSeen.state}</p>
                    <p className="text-lg font-semibold"><br/>Key Details:</p>
                    <p>Area Suspected To Be: {report.areaSuspectedToBe}</p>
                    <p>Hair Colour: {report.hairColour}</p>
                    <p>Eye Colour: {report.eyeColour}</p>
                    <p>Complexion: {report.complexion[0]}</p>
                    <p>Gender: {report.gender}</p>
                    <p>Amber Alert: {report.amberAlert ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="flex space-x-4 pt-2 w-full justify-end">
                  <button
                    className="bg-yellow rounded-full p-1 text-sm"
                    onClick={() => handleEditReportButtonClick(report.reportId)}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 mt-5 w-full flex flex-wrap justify-center">
          {reports.map((report) => (
            <div className="flex flex-row p-2" key={report._id}>
              <div className="">
                <div className="flex flex-row">
                  <div className="aspect-w-1 aspect-h-1 flex items-center">
                    <img src={report.photoURL} alt="Missing Person" className="h-28 w-28 object-cover" />
                  </div>
                  <div className="flex flex-col font-main text-sm pl-2">
                    <p className="text-lg">{report.fullName}</p>
                    <p>{report.currentAge[0].number} {report.currentAge[0].type} old</p>
                    <p>Last Seen: {new Date(report.dateLastSeen).toISOString().split("T")[0]}</p>
                    <p>Location Last Seen: {report.locationLastSeen.address}, {report.locationLastSeen.city}, {report.locationLastSeen.state}</p>
                  </div>
                </div>
                <div className="flex w-full justify-end">
                  <button
                    className="bg-yellow rounded-full p-1 text-xs"
                    onClick={() => handleEditReportButtonClick(report.reportId)}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  
export default Home;

