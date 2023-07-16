import SignupForm from "../components/SignupForm";
import RenderFormButton from "../components/RenderFormButton";
import UpdateUserForm from "../components/UpdateUserDetailsForm";
import { useState } from "react";

export function Dashboard() {
  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(false);

  const handleUpdateAccountButtonClick = () => {
    setShowUpdateAccountForm(true);
    setShowUpdateReportForm(false);
  };

  const handleUpdateReportButtonClick = () => {
    setShowUpdateReportForm(true);
    setShowUpdateAccountForm(false);
  };

  const handleNewReportButtonClick = () => {
    setShowUpdateReportForm(true);
    setShowUpdateAccountForm(false);
    setShowNewReportForm(true);
  };


  return (
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
      {showNewReportForm && ""}

    </div>
  );
}
