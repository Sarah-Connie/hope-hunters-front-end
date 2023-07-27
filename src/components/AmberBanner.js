import { useState, useEffect } from "react";
import axios from "../api/axios";


function AmberAlertBanner() {
  const [amberAlerts, setAmberAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/missing/amber-alerts")
      .then((response) => {
        setAmberAlerts(response.data);
      })
      .catch((error) => {
        setError("Amber Alerts currently unavailable. Please check back later.")
        console.error("Error fetching amber alerts data:", error);
      });
  }, []);

  return (
    <div className="h-12 bg-amber flex justify-end overflow-hidden">
      <div className="w-full flex items-center whitespace-nowrap animate-continuous justify-evenly font-main">
        {error ? (
          <span className="font-bold uppercase">{error}</span>
        ) : (
          <>
            <span className="font-bold uppercase">Active Amber Alerts</span>
            {amberAlerts.map((alert) => (
              <span key={alert._id}>{alert.fullName}</span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}  

export default AmberAlertBanner;
