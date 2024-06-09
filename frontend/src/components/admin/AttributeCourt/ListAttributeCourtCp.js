import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallApi from '../../../services/CallApi';
import { FaPlus } from 'react-icons/fa';

const ListAttributeCourtCp = () => {
  const [courtAtbKeyList, setCourtAtbKeyList] = useState([]);

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

  useEffect(() => {
    fetchCourtAtbKeyList();
  }, []);

  return (
    <>
      <div className="flex justify-center min-h-screen py-2">
        <div className="max-w-3xl w-full">
          <div className="flex justify-end mb-4">
            <button className="border p-2 rounded-md bg-blue-500 flex items-center">
              <FaPlus className="mr-2 text-white" />
              <Link
                to="/create-court-attribute"
                className="text-white uppercase"
              >
                <span className="text-white uppercase">Court Attribute</span>
              </Link>
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
                      to={`/detail-court-attribute/${items.id}`}
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
    </>
  );
};

export default ListAttributeCourtCp;