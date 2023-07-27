// function SortButtons({ onFetchAmberAlerts, onSortAZ, onSortZA }) {
function SortButtons({ fetchAmberAlerts }) {
  return (
    <div className="flex flex-row items-center font-main">
      <p className="mr-2">Sort By:</p>
      <button className="bg-blue text-white rounded px-4 py-2 mt-2" onClick={fetchAmberAlerts}>
        Amber Alerts
      </button>
      <button className="bg-blue text-white rounded px-4 py-2 mt-2 mx-2" onClick={""}>
        A-Z
      </button>
      <button className="bg-blue text-white rounded px-4 py-2 mt-2" onClick={""}>
        Z-A
      </button>
    </div>
  );
}

export default SortButtons;
