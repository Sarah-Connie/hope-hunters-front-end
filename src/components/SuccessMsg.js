import React from "react";

export function SuccessMsg({ message }) {
  return (
    <div className="font-main flex pt-5 justify-center text-center text-lg md:text-2xl">
      <p className="w-1/2">{message}</p>
    </div>
  );
};

export default SuccessMsg;