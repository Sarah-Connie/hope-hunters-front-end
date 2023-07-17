import RenderFormButton from "../components/RenderFormButton";
import UpdateUserForm from "../components/UpdateUserDetailsForm";
import { useState } from "react";
import NewMPForm from "../components/NewMPForm";

export function Dashboard() {
  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(true);

  const handleUpdateAccountButtonClick = () => {
    setShowUpdateAccountForm(true);
    setShowUpdateReportForm(false);
    setShowNewReportForm(false);
  };

  const handleUpdateReportButtonClick = () => {
    setShowUpdateAccountForm(false);
    setShowUpdateReportForm(true);
    setShowNewReportForm(false);
  };

  const handleNewReportButtonClick = () => {
    setShowUpdateReportForm(false);
    setShowUpdateAccountForm(false);
    setShowNewReportForm(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
    {/* left column */}
      <div className="col-span-1 mr-5">
        {showUpdateAccountForm && <UpdateUserForm />}
        {showUpdateReportForm && ""}
        {showNewReportForm && <NewMPForm />}
      </div>
    {/* right column */}
        <div className="col-span-1 flex flex-col justify-end">
            <div className="flex flex-row space-x-5 mb-4 mr-5">
                    {!showUpdateAccountForm && (
                    <RenderFormButton
                        onClick={handleUpdateAccountButtonClick}
                        buttonText="Update Account"
                    />
                    )}
            
                
                {!showUpdateReportForm && (
                <RenderFormButton
                    onClick={handleUpdateReportButtonClick}
                    buttonText="Update Report"
                />
                )}
                {!showNewReportForm && (
                <RenderFormButton
                    onClick={handleNewReportButtonClick}
                    buttonText="File New Report"
                />
                )}
            </div>
        </div>
    </div>
  );
}
