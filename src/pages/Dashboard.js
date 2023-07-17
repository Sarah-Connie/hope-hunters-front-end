import RenderFormButton from "../components/RenderFormButton";
import UpdateUserForm from "../components/UpdateUserDetailsForm";
import { useState, useEffect } from "react";
import NewMPForm from "../components/NewMPForm";
import { useMediaQuery } from "react-responsive";


// updatereport form will be rendered per report case.
// updatereport button will be changed to delete account button.
// pop up overlay window only confirming account deletion

export function Dashboard() {
  const isMdScreenOrLarger = useMediaQuery({ minWidth: 768 });

  const [showUpdateAccountForm, setShowUpdateAccountForm] = useState(false);
  const [showUpdateReportForm, setShowUpdateReportForm] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(true);

// if updateaccount button is clicked, only render updateaccount form
  const handleUpdateAccountButtonClick = () => {
    setShowUpdateAccountForm(true);
    setShowUpdateReportForm(false);
    setShowNewReportForm(false);
  };

  // if updatereport button is clicked, only render updatereport form
  const handleUpdateReportButtonClick = () => {
    setShowUpdateAccountForm(false);
    setShowUpdateReportForm(true);
    setShowNewReportForm(false);
  };

  // if newreport button is clicked, only render newreport form
  const handleNewReportButtonClick = () => {
    setShowUpdateReportForm(false);
    setShowUpdateAccountForm(false);
    setShowNewReportForm(true);
  };

  useEffect(() => {
    if (!isMdScreenOrLarger) {
      // For small screens, set showNewReportForm to false on mount 
      // this way button shows by default, but not newMP form
      setShowNewReportForm(false);
    } else {
      // For larger screens, set showNewReportForm to true on mount
      // so that the newMP form is rendered by default
      setShowNewReportForm(true);
    }
  }, [isMdScreenOrLarger]);


  return (
    <div>
    {isMdScreenOrLarger ? (
        <div className="p-2 grid grid-cols-2 gap-4">
    {/* left column 
        space to render any given selected form
    */}
      <div className="col-span-1 mr-5">
        {showUpdateAccountForm && <UpdateUserForm />}
        {showUpdateReportForm && ""}
        {showNewReportForm && <NewMPForm />}
      </div>
    {/* right column 
        buttons shown depending which form is rendered at the time
    */}
    <div className="col-span-1 flex flex-col justify-end">
        <div className="flex flex-row space-x-5 mb-4 mr-5">
            {/* if updateaccount form state is false (not showing), show button instead */}
            {!showUpdateAccountForm && (
            <RenderFormButton
                onClick={handleUpdateAccountButtonClick}
                buttonText="Update Account"
            />
            )}
            {/* if updatereport form state is false (not showing), show button instead */}
            {!showUpdateReportForm && (
            <RenderFormButton
                onClick={handleUpdateReportButtonClick}
                buttonText="Update Report"
            />
            )}
            {/* if newreport form state is false (not showing), show button instead */}
            {!showNewReportForm && (
            <RenderFormButton
                onClick={handleNewReportButtonClick}
                buttonText="File New Report"
            />
            )}
        </div>
    </div>
    </div> ) : ( 
    <div className="p-4">
        <div className="flex w-1/2 space-x-1">
            {!showNewReportForm && (
            <RenderFormButton
                onClick={handleNewReportButtonClick}
                buttonText="File New Report"
            />
            )}
        </div>
        {/* conditional searchbar to go here */}
        <div>
            {showUpdateAccountForm && <UpdateUserForm />}
            {showUpdateReportForm && ""}
            {showNewReportForm && <NewMPForm />}
        </div>
        <div>
            {/* individual case reports here */}
            {/* linked update report and delete report buttons */}
        </div>
        <div className="flex flex-row relative space-x-1">
            {!showUpdateAccountForm && (
            <RenderFormButton
                onClick={handleUpdateAccountButtonClick}
                buttonText="Update Account"
            />
            )}
            {/* change this to be a delete account button. 
            pop up overlay window only confirming account deletion */}
            {!showUpdateReportForm && (
            <RenderFormButton
                onClick={handleUpdateReportButtonClick}
                buttonText="Update Report"
            />
            )}
        </div>
       
    </div>

    )
    }
    </div>
  );
}
