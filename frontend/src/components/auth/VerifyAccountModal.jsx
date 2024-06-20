import React from 'react';

const VerifyAccountModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Tài Khoản chưa được xác minh</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end border-t p-4">
          <button onClick={onClose} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountModal;
