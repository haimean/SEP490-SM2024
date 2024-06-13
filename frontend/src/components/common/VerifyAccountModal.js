import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">X</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
