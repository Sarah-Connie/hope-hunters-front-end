import React from "react";

const SupportPage = () => {
  return (
    <div className="container mx-auto py-8 font-main">
      <h1 className="text-3xl font-semibold mb-4">Support and Resources</h1>
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Suicide Prevention Hotline */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Suicide Prevention Hotline</h2>
          <span className="text-sm">
            <p>If you or someone you know is struggling with suicidal thoughts, call Lifeline Australia at 13 11 14 for 24/7 support.</p>
            <p>You are not alone, Lifeline Australia will listen.</p>
            <br/>
            <p>Please visit <a href="https://www.lifeline.org.au/" className="italic font-semibold">Lifeline Australia</a> for more information.</p>
          </span>
        </div>

        {/* Free Australian Counselling Service */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Free Australian Counselling Services</h2>
          <span className="text-sm">
            <p>For free counseling support, you can contact Beyond Blue at 1300 224 636. They provide 24/7 conuselling support and other mental health services.</p>
            <br/>
            <p>Please visit <a href="https://www.beyondblue.org.au/" className="italic font-semibold">Beyond Blue</a> for more information.</p>          
          </span>
        </div>

        {/* Crimestoppers Information */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Report Crime to Crimestoppers</h2>
          <span className="text-sm">
            <p>If you have information about a missing person or a crime, you can report it anonymously to Crimestoppers at 1800 333 000. Supported by the Australian Government.</p>
            <br/>
            <p>Please visit <a href="https://crimestoppers.com.au/" className="italic font-semibold">Crimestoppers</a> for more information.</p>          
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
