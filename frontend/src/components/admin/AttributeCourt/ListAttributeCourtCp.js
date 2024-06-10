import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallApi from '../../../services/CallApi';
import { FaPlus } from 'react-icons/fa';
import CreateAttributeCourtCp from './CreateAttributeCourtCp';

const ListAttributeCourtCp = () => {
  const [courtAtbKeyList, setCourtAtbKeyList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCourtAtbKeyList();
  }, []);

  const fetchCourtAtbKeyList = async () => {
    try {
      const response = await CallApi(
        '/api/admin/attribute-court/key',
        'get',
      )
      setCourtAtbKeyList(response?.data);
    } catch (error) {
      console.log("=============== fetch list court attribute ERROR: " + error.response?.data?.error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchCourtAtbKeyList();
  };

  return (
    <>
      <div className="flex justify-center min-h-screen py-2">
        <div className="max-w-3xl w-full">
          <div className="flex justify-end mb-4">
            <button
              onClick={openModal}
              className="border p-2 rounded-md bg-blue-500 flex items-center"
            >
              <FaPlus className="mr-2 text-white" />
              <span className="text-white uppercase">Court Attribute</span>
            </button>
          </div>
          <h1 className="text-center mb-4">COURT ATTRIBUTE</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {courtAtbKeyList.map((items) => (
                <tr key={items.id} className="border-b last:border-0">
                  <td className="px-4 py-2 border text-center">{items.id}</td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`/admin/detail-court-attribute/${items.id}`}
                      className="text-blue-600"
                    >
                      {items.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">{items.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
            <CreateAttributeCourtCp closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default ListAttributeCourtCp;