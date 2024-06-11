import React, { useEffect, useState } from 'react';
import CallApi from "../../../services/CallApi.js";
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const DetailAttributeBranchCp = () => {
  const [branchAtbKey, setBranchAtbKey] = useState({});
  const [branchAtbList, setBranchAtbList] = useState([]);
  const { id } = useParams();

  const fetchBranchAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/key/${id}`,
        'get',
      )
      setBranchAtbKey(response?.data);
    } catch (error) {
      console.log("=============== fetch branch attribute ERROR: " + error.response?.data?.error);
    }
  };

  const fetchBranchAtbList = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches`,
        'get',
      )
      setBranchAtbList(response?.data);
      console.log(branchAtbList);
    } catch (error) {
      console.log("=============== fetch branch attribute ERROR: " + error.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchBranchAtbKey();
    fetchBranchAtbList();
  }, []);

  return (
    <div className="w-full flex justify-center my-4">
      <div className="max-w-6xl w-full flex justify-center items-start p-10 border rounded-lg shadow bg-white gap-5">
        <div className="w-1/2">
          <h1 className="text-center">Detail Page for {branchAtbKey.name}</h1>
          <div>
            <p>ID: {branchAtbKey.id}</p>
            <p>Name: {branchAtbKey.name}</p>
            <p>Description: {branchAtbKey.description}</p>
          </div>
        </div>
        <div className="w-1/2 text-center">
          <div className="flex justify-end mb-4">
            <button
              // onClick={openCreateModal}
              className="border p-2 rounded-md bg-blue-500 flex items-center"
            >
              <FaPlus className="mr-2 text-white" />
              <span className="text-white uppercase">Branch Value</span>
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Value</th>
                <th className="px-4 py-2 border">isPulic</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {branchAtbList.map((items) => (
                <tr key={items.id} className="border-b last:border-0">
                  <td className="px-4 py-2 border text-center">{items.id}</td>
                  <td className="px-4 py-2 border">
                    {items.value}
                  </td>
                  <td className="px-4 py-2 border">{items.isPublic}</td>
                  <td className="px-4 py-2 border text-center w-1/3">
                    <button
                      // onClick={() => openUpdateModal(items.id)}
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
    </div>
  );
};

export default DetailAttributeBranchCp;