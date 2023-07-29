import React from 'react';

const ConfirmationWindow = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="confirmation-message text-xl mb-4">{message}</div>
        <div className="confirmation-buttons flex justify-end">
          <button
            onClick={onConfirm}
            className="confirmation-button confirm bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="confirmation-button cancel bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
