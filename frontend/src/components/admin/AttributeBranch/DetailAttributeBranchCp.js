import React, { useEffect, useState } from 'react';
import CallApi from "../../../services/CallApi.js";
import { useParams } from 'react-router-dom';

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
      <div className="w-2/3 flex justify-center items-start">
        <div className="w-1/2 text-center">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Value</th>
                <th className="px-4 py-2 border">isPulic</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <h1 className="text-center">Detail Page for {branchAtbKey.name}</h1>
          <div>
            <p>ID: {branchAtbKey.id}</p>
            <p>Name: {branchAtbKey.name}</p>
            <p>Description: {branchAtbKey.description}</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DetailAttributeBranchCp;