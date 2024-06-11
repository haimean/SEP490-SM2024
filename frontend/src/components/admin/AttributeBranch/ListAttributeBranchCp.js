import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CallApi from "../../../services/CallApi.js";
import CreateAttributeBranchCp from "./CreateAttributeBranchCp.js";
import UpdateAttributeBranchCp from "./UpdateAttributeBranchCp.js";

const ListAttributeBranchCp = () => {
  const [branchAtbKeyList, setBranchAtbKeyList] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchBranchAtbKeyList();
  }, []);

  const fetchBranchAtbKeyList = async () => {
    try {
      const response = await CallApi(
        "/api/admin/attribute-branches/key",
        "get"
      );
      setBranchAtbKeyList(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch list branch attribute ERROR: " +
        error.response?.data?.error
      );
    }
  };

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
    fetchBranchAtbKeyList();
  };

  const openUpdateModal = (id) => {
    setId(id);
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
    fetchBranchAtbKeyList();
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
              <span className="text-white uppercase">Branch Attribute</span>
            </button>
          </div>
          <h1 className="text-center mb-4">BRANCH ATTRIBUTE</h1>
          <table className="min-w-full bg-white shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {branchAtbKeyList.map((items) => (
                <tr key={items.id} className="border-b last:border-0">
                  <td className="px-4 py-2 border text-center">{items.id}</td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`/admin/detail-branch-attribute/${items.id}`}
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
      {isModalCreateOpen && <CreateAttributeBranchCp closeModal={closeCreateModal} />}
      {isModalUpdateOpen && <UpdateAttributeBranchCp closeModal={closeUpdateModal} id={id}/>}
    </>
  );
};

export default ListAttributeBranchCp;
