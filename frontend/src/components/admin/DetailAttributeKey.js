import React from 'react';
import { FaPlus } from "react-icons/fa";

const DetailAttributeKey = ({
  titleCreateButton,
  detailItem,
  valueList,
  openCreateModal,
  openUpdateModal,
  deleteItem
}) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div className="max-w-6xl w-full flex justify-center items-start p-10 border rounded-lg shadow bg-white gap-5">
        <div className="w-1/2">
          <h1 className="text-center">Detail Page for {detailItem.name}</h1>
          <div>
            <p>ID: {detailItem.id}</p>
            <p>Name: {detailItem.name}</p>
            <p>Description: {detailItem.description}</p>
          </div>
        </div>
        <div className="w-1/2 text-center">
          <div className="flex justify-end mb-4">
            <button
              onClick={openCreateModal}
              className="border p-2 rounded-md bg-blue-500 flex items-center"
            >
              <FaPlus className="mr-2 text-white" />
              <span className="text-white uppercase">{titleCreateButton}</span>
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Value</th>
                <th className="px-4 py-2 border">isPublic</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {valueList.map((items) => (
                <tr key={items.id} className="border-b last:border-0">
                  <td className="px-4 py-2 border text-center">{items.id}</td>
                  <td className="px-4 py-2 border">{items.value}</td>
                  <td className="px-4 py-2 border">{items.isPublic}</td>
                  <td className="px-4 py-2 border text-center w-1/3">
                    <button
                      onClick={() => openUpdateModal(items.id)}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(items.id)}
                      className="p-2 bg-red-500 text-white rounded-md ml-2"
                    >
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

export default DetailAttributeKey;