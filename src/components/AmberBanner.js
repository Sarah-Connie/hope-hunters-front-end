import { useState, useEffect } from "react";
import axios from "../api/axios";

function AmberAlertBanner() {
  const [amberAlerts, setAmberAlerts] = useState([]);
  const [error, setError] = useState("");
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    axios
      .get("/missing/amber-alerts")
      .then((response) => {
        setAmberAlerts(response.data);
        if (response.data.length === 0) {
          setError("No Active Amber Alerts");
        } else {
          // animation to start 2s after mount
          setTimeout(() => {
            setStartAnimation(true);
          }, 2000);
        }
      })
      .catch((error) => {
        setError("Amber Alerts currently unavailable");
        console.error("Error fetching amber alerts data:", error);
      });
  }, []);

  return (
    <div className="h-12 bg-amber flex justify-end overflow-hidden">
      <div
        className={`w-full flex items-center whitespace-nowrap ${
          startAnimation ? "animate-continuous" : ""
        } justify-evenly font-main`}
      >
        {error ? (
          <div className="font-bold uppercase">{error}</div>
        ) : (
          <>
            <div className="font-main font-bold uppercase">Active Amber Alerts</div>
            {amberAlerts.map((alert) => (
              <div className="flex flex-row uppercase" key={alert._id}>
                <span>{alert.fullName},</span>
                <span className="ml-1">
                  {alert.currentAge[0].number} {alert.currentAge[0].type} old,
                </span>
                <span className="ml-1">
                  {alert.locationLastSeen.city}, {alert.locationLastSeen.state}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AmberAlertBanner;
