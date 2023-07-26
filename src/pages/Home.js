import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";


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
  {reportId: 1,
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
  {reportId: 1,
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

export function Home() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  const handleEditReportButtonClick = (reportId) => {
    const report = reports.find((report) => report.reportId === reportId);
    if (report) {
      navigate("/dashboard")
    }
  };

  useEffect(() => {
    setReports(data);
  }, []);


  return (
    <div>
      <div className="mt-16 flex justify-center text-center font-main font-bold text-2xl md:text-3xl">
        Currently Active Reports
      </div>
      {isMdScreenOrLarger ? (
        <div className="p-4 mt-5 lg:p-2 gap-4 w-full flex flex-wrap justify-center justify-around">
          {reports.map((report) => (
            <div className="flex flex-row p-2" key={report.reportId}>
              <div className="mt-5">
                <div className="flex flex-col">
                  <div className="aspect-w-1 aspect-h-1">
                    <img src={report.photoURL} alt="Missing Person" className="md:h-52 md:w-52 lg:h-64 lg:w-64 object-cover" />
                  </div>
                  <div className="flex flex-col font-main">
                    <p className="text-2xl pt-1">{report.fullName}</p>
                    <p>{report.ageNumber} {report.ageMeasurement} old</p>
                    <p>Last Seen: {new Date(report.dateLastSeen).toISOString().split("T")[0]}</p>
                    <p>Location Last Seen: {report.locationLastSeen.address}</p>
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
            <div className="flex flex-row p-2" key={report.reportId}>
              <div className="">
                <div className="flex flex-row">
                  <div className="aspect-w-1 aspect-h-1 flex items-center">
                    <img src={report.photoURL} alt="Missing Person" className="h-28 w-28 object-cover" />
                  </div>
                  <div className="flex flex-col font-main text-sm pl-2">
                    <p className="text-xl">{report.fullName}</p>
                    <p>{report.ageNumber} {report.ageMeasurement} old</p>
                    <p>Last Seen: {new Date(report.dateLastSeen).toISOString().split("T")[0]}</p>
                    <p>Location Last Seen: {report.locationLastSeen.address}</p>
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

