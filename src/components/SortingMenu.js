import { useState, useEffect } from "react";

function SortMenu({ onSortChange, selectedOption }) {
  const [sortError, setSortError] = useState("");

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortError(""); // clear the sortError when a new option is selected
    onSortChange(selectedValue);
  };

  useEffect(() => {
    setSortError(""); // clear the sortError when component mounts or receives new props
  }, []);

  return (
    <div className="flex flex-row items-center font-main justify-center w-full">
      <p className="w-2/6 md:w-2/5 lg:w-1/5">Sort By:</p>
      <select
        className="bg-lightblue text-white rounded px-4 py-2 mt-2 md:h-12 w-full text-sm md:text-base"
        onChange={handleSortChange}
        // defaultValue=""
        value={selectedOption}
      >
        <option value="">Select</option>
        <option value="nameAZ">Name (A-Z)</option>
        <option value="ageAsc">Age (Youngest-Oldest)</option>
        <option value="ageDesc">Age (Oldest-Youngest)</option>
        <option value="amberAlerts">Amber Alerts (Recent first)</option>
        <option value="dateLastSeenAsc">Date Last Seen (Recent First)</option>
        <option value="dateLastSeenDesc">Date Last Seen (Oldest First)</option>
        <option value="locationLastSeenAZ">Location Last Seen (A-Z)</option>
      </select>
      {/* {sortError && (
        <p className="text-red-500 text-sm ml-3 italic">{sortError}</p>
      )} */}
    </div>
  );
}

export default SortMenu;


