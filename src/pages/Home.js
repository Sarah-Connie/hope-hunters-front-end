import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "../api/axios";
import SearchBar from "../components/Searchbar";
import AmberAlertBanner from "../components/AmberBanner";

export function Home() {
  const [reports, setReports] = useState([]);
  const [originalReports, setOriginalReports] = useState([]);
  const [error, setError] = useState("");
  const [sortError, setSortError] = useState("");
  const [hasSortError, setHasSortError] = useState(false);

  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  // Callback function to update reports based on search result
  const handleSearchResult = (searchResult) => {
    setReports(searchResult);
    setError(""); // Clear the search error when a new search is performed
    setSortError(""); // Clear the sort error when a new search is performed
    setHasSortError(false);
  };

  const handleClearSearch = () => {
    // Set the "reports" state back to the original list from api call
    setReports(originalReports);
    setError("");
    setSortError("");
    setHasSortError(false);
  };

  const fetchMissingPersonsData = async () => {
    try {
      const response = await axios.get("/missing/");
      setReports(response.data);
      setOriginalReports(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("General report data unavailable. Please try the search or filter instead.");
      } else {
        setError("Error fetching missing persons data. Please try again later.");
        console.error("Error fetching missing persons data:", error);
      }
    }
  };

  useEffect(() => {
    fetchMissingPersonsData();
  }, []);


  // for sorting by amber alerts
  const fetchAmberAlerts = async () => {
    try {
      const response = await axios.get("/missing/amber-alerts");
      setReports(response.data);
      setSortError("");
      setHasSortError(false);
    } catch (error) {
      setSortError("Unable to sort at this time.");
      setHasSortError(true);
      setReports(originalReports)

    }
  };


  // dynamically pass the selected option from dropdown to api call
  // easier to add drop down options when added to the same api route
  // in the future
  const fetchSortData = async (sortOption) => {
    try {
      const response = await axios.get(`/missing/sorted/${sortOption}`);
      setReports(response.data);
      setSortError("");
      setHasSortError(false);
    } catch (error) {
      setSortError("Unable to sort at this time.");
      setHasSortError(true);
      setReports(originalReports)
    }
  };

  // handler for dropdown menu
  const handleSortChange = (selectedValue) => {
    setError("");
    if (selectedValue === "") {
      setReports(originalReports);
      setSortError("");
      setHasSortError(false);
    } else {
      switch (selectedValue) {
        case "nameAZ":
          fetchSortData("fullName");
          break;
        case "ageAsc":
          fetchSortData("currentAge");
          break;
        case "ageDesc":
          fetchSortData("ageOldest");
          break;
        case "amberAlerts":
          fetchAmberAlerts();
          break;
        case "dateLastSeenAsc":
          fetchSortData("dateLastSeenNewest");
          break;
        case "dateLastSeenDesc":
          fetchSortData("dateLastSeenOldest");
          break;
        case "locationLastSeenAZ":
          fetchSortData("lastSeen");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="pb-5 flex flex-col flex-grow justify-between">
      <div className="z-50 sticky top-0">
        <AmberAlertBanner />
        <SearchBar
          onSearchResult={handleSearchResult}
          onClearSearch={handleClearSearch}
          originalReports={originalReports}
          onSortChange={handleSortChange}
          sortError={sortError}
          hasSortError={hasSortError}
          setError={setError}
        />
      </div>
      <div className="mt-8 flex justify-center text-center font-main font-bold text-2xl md:text-3xl">
        Currently Active Reports
      </div>
      {error && (
        <p className="m-5 w-full flex justify-center text-red-500 text-xl md:text-2xl ml-3 italic">
          {error}
        </p>
      )}
      {hasSortError && (
        <p className="m-5 w-full flex justify-center text-red-500 text-xl md:text-2xl ml-3 italic">
          {sortError}
        </p>
      )}
      {/* display a message if no reports are found and there's no stored error */}
      {reports.length === 0 && !error && !hasSortError && (
        <p className="m-5 w-full flex justify-center text-blue text-xl md:text-2xl ml-3 italic">
          No missing persons reports found.
        </p>
      )}
      {isMdScreenOrLarger ? (
        <div className="p-4 mt-5 lg:p-2 gap-4 w-full flex flex-wrap justify-center justify-around md:text-center">
          {reports.map((report) => (
            <div className={`flex flex-col p-2 rounded ${report.amberAlert ? 'bg-orange' : 'border border-blue'}`} key={report._id}>
              <div className="mt-5">
                <div className="flex flex-col">
                  <div className="aspect-w-1 aspect-h-1 justify-center flex">
                    <img src={report.photoURL} alt="Missing Person" className="md:h-52 md:w-52 lg:h-64 lg:w-64 object-cover" />
                  </div>
                  <div className="flex flex-col font-main p-2">
                    <p className="text-2xl pt-1">{report.fullName}</p>
                    <p>Current Age: {report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}</p>
                    <p>Age at Reported Missing: {report.age[0].number ? report.age[0].number + ' ' + report.age[0].type + ' old' : 'Unreported'}</p>
                    <p>Date Last Seen: {report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}</p>
                    <p className="">Location Last Seen - </p>
                    <p>{report.locationLastSeen.address ? ("Address: " + report.locationLastSeen.address) : ("Address: Unreported")}</p>
                    {/* <p>{report.locationLastSeen.city ? ("City: " + report.locationLastSeen.city) : ("")}      Postcode: {report.locationLastSeen.postcode}</p>
                    <p>State: {report.locationLastSeen.state ? (report.locationLastSeen.state) : ("Unreported")}</p> */}
                    <p>{report.locationLastSeen.city ? ("City: " + report.locationLastSeen.city) : ("")}    </p>
                    <p>{report.locationLastSeen.state ? (report.locationLastSeen.state) : ("")} {report.locationLastSeen.postcode}</p>
                    <p>Area Suspected To Be: {report.areaSuspectedToBe ? (report.areaSuspectedToBe) : ("Unreported")}</p>
                    
                    <p className="text-lg font-semibold"><br/>Key Details:</p>
                    <p>Height: {report.height.number ? report.height.number + 'cm' : 'Unreported'}, Weight: {report.weight.number ? report.weight.number + ' ' + report.weight.measurement[0] : 'Unreported'}</p>
                    <p>Hair Colour: {report.hairColour ? (report.hairColour) : ("Unreported")}, Eye Colour: {report.eyeColour ? (report.eyeColour) : ("Unreported")}</p>
                    <p>Complexion: {report.complexion[0] ? (report.complexion[0]) : ("Unreported")}</p>
                    <p>Gender: {report.gender}</p>
                    <p>{report.distinctiveFeatures ? ("Distinctive Features: " + report.distinctiveFeatures) : ("No Distinct Features")}</p>
                    <p className="italic">{report.amberAlert ? "Active Amber Alert" : ""}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 mt-2 w-full flex flex-wrap justify-center">
            {reports.map((report) => (
            <div className={`flex flex-col p-4 mb-5 rounded ${report.amberAlert ? 'bg-orange' : 'border border-blue'}`} key={report._id}>
                <div className="flex flex-row">
                    <div className="aspect-w-1 aspect-h-1 flex items-start flex-grow items-center">
                        <img src={report.photoURL ? (report.photoURL) : ("No Photo Provided")} alt="Missing Person" className="h-28 w-28 object-cover" 
                        />
                    </div>
                    <div className="flex flex-col font-main text-sm pl-3 w-4/6">
                        <p className="text-lg italic pb-1">{report.fullName}</p>
                        <p>Current Age: {report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}</p>
                        <p>Age at Reported Missing: {report.age[0].number ? report.age[0].number + ' ' + report.age[0].type + ' old' : 'Unreported'}</p>
                        <p>Date Last Seen: {report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}</p>
                        <p className="pt-1">Location Last Seen - </p>
                        <p>{report.locationLastSeen.address ? ("Address: " + report.locationLastSeen.address) : ("")}</p>
                        <p>{report.locationLastSeen.city ? ("City: " + report.locationLastSeen.city) : ("")}    </p>
                        <p>{report.locationLastSeen.state ? (report.locationLastSeen.state) : ("")} {report.locationLastSeen.postcode}</p>
                        <p>Area Suspected To Be: {report.areaSuspectedToBe ? (report.areaSuspectedToBe) : ("Unreported")}</p>
                    </div>
                </div>
                <div className="flex flex-col font-main text-sm">
                    <p className="text-lg font-semibold pt-2">Key Details:</p>
                    <p>Height: {report.height.number ? report.height.number + 'cm' : 'Unreported'}, Weight: {report.weight.number ? report.weight.number + ' ' + report.weight.measurement[0] : 'Unreported'}</p>
                    <p>Hair Colour: {report.hairColour ? (report.hairColour) : ("Unreported")}, Eye Colour: {report.eyeColour ? (report.eyeColour) : ("Unreported")}</p>
                    <p>Complexion: {report.complexion[0]}</p>
                    <p>Gender: {report.gender}</p>
                    <p>{report.distinctiveFeatures ? ("Distinctive Features: " + report.distinctiveFeatures) : ("No Distinct Features")}</p>
                    <p className="italic">{report.amberAlert ? "Active Amber Alert" : ""}</p>
                </div>
            </div>
        ))}
        </div>
        )}
    </div>
    );

}
  
export default Home;

