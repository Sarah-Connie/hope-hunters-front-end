import React from 'react';

const ConfirmationWindow = ({ message, onConfirm, onCancel, error }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="mb-4 font-main text-lg md:text-xl">{message}</div>
        {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
        <div className="flex font-main justify-evenly">
          <button
            onClick={onConfirm}
            disabled={!!error} // disable the button if there is an error
            className="bg-blue text-white hover:bg-orange hover:scale-105 ease-out duration-200 px-4 py-2 rounded mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-orange hover:scale-105 ease-out duration-200 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
