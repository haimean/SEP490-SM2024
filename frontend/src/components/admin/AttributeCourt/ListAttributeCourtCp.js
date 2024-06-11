import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallApi from '../../../services/CallApi';
import { FaPlus } from 'react-icons/fa';
import CreateAttributeCourtCp from './CreateAttributeCourtCp.js';
import UpdateAttributeCourtCp from './UpdateAttributeCourtCp.js'

const ListAttributeCourtCp = () => {
  const [courtAtbKeyList, setCourtAtbKeyList] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [id, setId] = useState(null);

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

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
    fetchCourtAtbKeyList();
  };

  const openUpdateModal = (id) => {
    setId(id);
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
    fetchCourtAtbKeyList();
  };

  return (
    <>
      <div className="flex justify-center py-2">
        <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
          <div className="flex justify-end mb-4">
            <button
              onClick={openCreateModal}
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
                <th className="px-4 py-2 border">Action</th>
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
                  <td className="px-4 py-2 border text-center w-1/5">
                    <button
                      onClick={() => openUpdateModal(items.id)}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded-md ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalCreateOpen && <CreateAttributeCourtCp closeModal={closeCreateModal} />}
      {isModalUpdateOpen && <UpdateAttributeCourtCp closeModal={closeUpdateModal} id={id} />}
    </>
  );
};

export default ListAttributeCourtCp;