import SignupForm from "../components/SignupForm";
import RenderFormButton from "../components/RenderFormButton";
import UpdateUserForm from "../components/UpdateUserDetailsForm";
import { useState, useEffect } from "react";
import NewMPForm from "../components/NewMPForm";

export function Dashboard() {
  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(false);
  const [newMPFormRendered, setNewMPFormRendered] = useState(false);

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

  useEffect(() => {
    if (!newMPFormRendered) {
      setShowNewReportForm(true);
      setNewMPFormRendered(true);
    }
  }, [newMPFormRendered]);

  return (
    <div>
        <div className="flex flex-col grid-cols-2">
            <div>
            {!showUpdateAccountForm && (
                <RenderFormButton
                onClick={handleUpdateAccountButtonClick}
                buttonText="Update Account"
                />
            )}
            {showUpdateAccountForm && <UpdateUserForm />}

            {!showUpdateReportForm && (
                <RenderFormButton
                onClick={handleUpdateReportButtonClick}
                buttonText="Update Report"
                />
            )}
            {showUpdateReportForm && <SignupForm />}

            {!showNewReportForm && (
                <RenderFormButton
                onClick={handleNewReportButtonClick}
                buttonText="File New Report"
                />
            )}
            {showNewReportForm && <NewMPForm />}
            </div>
        </div>
    </div>
  );
}
