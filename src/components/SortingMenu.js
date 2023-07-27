function SortMenu({ onSortChange }) {


  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    onSortChange(selectedValue);
  };

  return (
    <div className="flex flex-row items-center font-main justify-center w-full">
      <p className="mr-2">Sort By:</p>
      <select className="bg-lightblue text-white rounded px-4 py-2 mt-2 h-12" 
      onChange={handleSortChange}>
        <option value="">Select</option>
        <option value="nameAZ">Name (A-Z)</option>
        <option value="ageAsc">Age (Youngest-Oldest)</option>
        <option value="ageDesc">Age (Oldest-Youngest)</option>
        <option value="amberAlerts">Amber Alerts (Recent first)</option>
        <option value="dateLastSeenAsc">Date Last Seen (Recent First)</option>
        <option value="dateLastSeenDesc">Date Last Seen (Oldest First)</option>
        <option value="locationLastSeenAZ">Location Last Seen (A-Z)</option>
      </select>
    </div>
  );
}

export default SortMenu;

