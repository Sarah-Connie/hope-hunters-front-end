import React, { useState } from "react";

// function UpdateDetailsButton({ onClick }) {
//     return (
//       <button
//         className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
//         onClick={onClick}
//       >
//         Update Details
//       </button>
//     );
// }

// export function UpdateUserForm() {
//     const [emailError, setEmailError] = useState("");
//     const [error, setError] = useState("");

//     const [userName, setUserName] = useState("");
//     const [userEmail, setUserEmail] = useState("");
//     const [userPassword, setUserPassword] = useState("");
//     const [stationName, setStationName] = useState("");
//     const [policeAreaCommand, setPoliceAreaCommand] = useState("");
//     const [policeDistrict, setPoliceDistrict] = useState("");

//     const isPoliceUser = userEmail.endsWith("@police.nsw.gov.au");

//   const [showUpdateUserDetailsForm, setShowUpdateUserDetailsForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowUpdateUserDetailsForm(true);
//   };

//   const userNameUpdate = (event) => {
//     setUserName(event.target.value);
//   };

//   const userEmailUpdate = (event) => {
//     setUserEmail(event.target.value);
//   };


//   const passwordUpdate = (event) => {
//     setUserPassword(event.target.value);
//   };

//   const stationNameUpdate = (event) => {
//     setStationName(event.target.value);
//   };

//   const policeAreaCommandUpdate = (event) => {
//     setPoliceAreaCommand(event.target.value);
//   };

//   const policeDistrictUpdate = (event) => {
//     setPoliceDistrict(event.target.value);
//   };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         try {
//             // updated user details object
//             const updatedUserDetails = {
//             name: userName,
//             email: userEmail,
//             password: userPassword,
//             stationName: stationName,
//             policeAreaCommand: policeAreaCommand,
//             policeDistrict: policeDistrict,
//             };
        
//             const response = await fetch("", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedUserDetails),
//             });
        
//             if (response.ok) {
//             console.log("User details updated successfully");
//             // Handle any success actions or display a success message to the user
//             } else {
//             console.error("Failed to update user details");
//             // Handle any error actions or display an error message to the user
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//         };
        

//   return (
//     <div>
//     {!showUpdateUserDetailsForm && <UpdateDetailsButton onClick={handleButtonClick} />}
    
//       {showUpdateUserDetailsForm && (
//         <form className="flex flex-col w-2/5 font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4 ml-10"
//         onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="name">
//                 Name:
//             </label>
//             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text" 
//             id="name" 
//             name="fullName" 
//             value={userName}
//             onChange={userNameUpdate}
//             required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email">
//                 Email:
//             </label>
//             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//             type="email" 
//             id="email" 
//             name="email" 
//             value={userEmail}
//             onChange={userEmailUpdate}
//             required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password">
//                 Password:
//             </label>
//             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//             type="password" 
//             id="password" 
//             name="password" 
//             value={userPassword}
//             onChange={passwordUpdate}
//             required />
//           </div>
//           {isPoliceUser && (
//             <>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stationName">
//                   Station Name:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="text"
//                   id="stationName"
//                   name="stationName"
//                   value={stationName}
//                   onChange={stationNameUpdate}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policeAreaCommand">
//                   Police Area Command:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="text"
//                   id="policeAreaCommand"
//                   name="policeAreaCommand"
//                   value={policeAreaCommand}
//                   onChange={policeAreaCommandUpdate}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policeDistrict">
//                   Police District:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="text"
//                   id="policeDistrict"
//                   name="policeDistrict"
//                   value={policeDistrict}
//                   onChange={policeDistrictUpdate}
//                   required
//                 />
//               </div>
//             </>
//           )}
//           <div className="flex items-center justify-center pt-4">
//             <button
//             className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
//             type="submit"
//             disabled={!!error} // disable the button if there is an error
//             >Submit</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }


// export default UpdateUserForm;

export function UpdateUserForm() {
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [stationName, setStationName] = useState("");
    const [policeAreaCommand, setPoliceAreaCommand] = useState("");
    const [policeDistrict, setPoliceDistrict] = useState("");

    const isPoliceUser = userEmail.endsWith("@police.nsw.gov.au");

//   const [showUpdateUserDetailsForm, setShowUpdateUserDetailsForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowUpdateUserDetailsForm(true);
//   };

  const userNameUpdate = (event) => {
    setUserName(event.target.value);
  };

  const userEmailUpdate = (event) => {
    setUserEmail(event.target.value);
  };


  const passwordUpdate = (event) => {
    setUserPassword(event.target.value);
  };

  const stationNameUpdate = (event) => {
    setStationName(event.target.value);
  };

  const policeAreaCommandUpdate = (event) => {
    setPoliceAreaCommand(event.target.value);
  };

  const policeDistrictUpdate = (event) => {
    setPoliceDistrict(event.target.value);
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // updated user details object
            const updatedUserDetails = {
            name: userName,
            email: userEmail,
            password: userPassword,
            stationName: stationName,
            policeAreaCommand: policeAreaCommand,
            policeDistrict: policeDistrict,
            };
        
            const response = await fetch("", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserDetails),
            });
        
            if (response.ok) {
            console.log("User details updated successfully.");
            // Handle any success actions or display a success message to the user
            } else {
            console.error("Failed to update user details.");
            // Handle any error actions or display an error message to the user
            }
        } catch (error) {
            console.error("Error:", error);
        }
        };
        

  return (
    <div>
        <form className="flex flex-col w-2/5 font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4 ml-10"
        onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
                Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            id="name" 
            name="fullName" 
            value={userName}
            onChange={userNameUpdate}
            required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
                Email:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" 
            id="email" 
            name="email" 
            value={userEmail}
            onChange={userEmailUpdate}
            required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
                Password:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            id="password" 
            name="password" 
            value={userPassword}
            onChange={passwordUpdate}
            required />
          </div>
          {isPoliceUser && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stationName">
                  Station Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="stationName"
                  name="stationName"
                  value={stationName}
                  onChange={stationNameUpdate}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policeAreaCommand">
                  Police Area Command:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="policeAreaCommand"
                  name="policeAreaCommand"
                  value={policeAreaCommand}
                  onChange={policeAreaCommandUpdate}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policeDistrict">
                  Police District:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="policeDistrict"
                  name="policeDistrict"
                  value={policeDistrict}
                  onChange={policeDistrictUpdate}
                  required
                />
              </div>
            </>
          )}
          <div className="flex items-center justify-center pt-4">
            <button
            className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
            type="submit"
            disabled={!!error} // disable the button if there is an error
            >Submit</button>
          </div>
        </form>
    </div>
  );
}


export default UpdateUserForm;
