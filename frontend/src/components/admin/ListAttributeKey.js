import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ic_tick from '../../assets/svg/ic_tick.svg';

const AttributeTable = ({
  title,
  urlDetail,
  attributeList,
  openCreateModal,
  openUpdateModal,
  deleteItem,
}) => {
  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
        <div className="flex justify-end mb-4">
          <button
            onClick={openCreateModal}
            className="border p-2 rounded-md bg-blue-500 flex items-center"
          >
            <FaPlus className="mr-2 text-white" />
            <span className="text-white uppercase">{title}</span>
          </button>
        </div>
        <h1 className="text-center mb-4">{title.toUpperCase()}</h1>
        <table className="min-w-full bg-white shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Active</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {attributeList.map((items) => (
              <tr key={items.id} className="border-b last:border-0">
                <td className="px-4 py-2 border text-center w-10">{items.id}</td>
                <td className="px-4 py-2 border">
                  <Link
                    to={`${urlDetail}/${items.id}`}
                    className="text-blue-600"
                  >
                    {items.name}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{items.description}</td>
                <td className="px-4 py-2 border text-center w-5">
                  {items.isActive ? <img src={ic_tick} alt="Active" className="h-4 w-4 inline-block" /> : null}
                </td>
                <td className="px-4 py-2 border text-center w-1/5">
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
  );
};

export default AttributeTable;
