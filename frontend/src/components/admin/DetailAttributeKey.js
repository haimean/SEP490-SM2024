import React, { useState } from "react";
import {
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaIdCardAlt,
  FaPencilAlt
} from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";

const applyFilter = ({ inputData, comparator, filterName }) => {
  return inputData
    .filter((item) =>
      item.value.toLowerCase().includes(filterName.toLowerCase())
    )
    .sort(comparator);
};

const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (order === "desc") {
      return b[orderBy] < a[orderBy] ? -1 : 1;
    }
    return a[orderBy] < b[orderBy] ? -1 : 1;
  };
};

const DetailAttributeKey = ({
  titleCreateButton,
  detailItem,
  valueList,
  openCreateModal,
  openUpdateModal,
  deleteItem,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [filterName, setFilterName] = useState("");

  const handleSort = (id) => {
    if (id === "value") {
      const isAsc = orderBy === id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: valueList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <div className="w-full flex justify-center my-4">
      <div className="max-w-6xl w-full flex justify-center items-start p-10 border rounded-lg shadow bg-white gap-5">
        <div className="w-1/2">
          <h1 className="text-center text-lg mb-7">
            Detail Page for{" "}
            <span className="text-blue-700">{detailItem.name}</span>
          </h1>
          <div className="border px-4 rounded-lg shadow bg-white mt-4">
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex items-center">
                <FaIdCardAlt className="text-blue-700 mr-2" />
                <span className="font-medium text-gray-500 uppercase pr-2">
                  ID:
                </span>
                <span>{detailItem.id}</span>
              </li>
              <li className="py-2 flex items-center">
                <FaPencilAlt className="text-blue-700 mr-2" />
                <span className="font-medium text-gray-500 uppercase pr-2">
                  Name:
                </span>
                <span>{detailItem.name}</span>
              </li>
              <li className="py-2 flex items-center">
                <BiSolidDetail className="text-blue-700 mr-2" />
                <span className="font-medium text-gray-500 uppercase pr-2">
                  Description:
                </span>
                <span>{detailItem.description}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 text-center">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
            />
            <button
              onClick={openCreateModal}
              className="border p-2 rounded-md bg-blue-500 flex items-center"
            >
              <FaPlus className="mr-2 text-white" />
              <span className="text-white uppercase">{titleCreateButton}</span>
            </button>
          </div>
          <table className="min-w-full bg-white shadow">
            <thead>
              <tr>
                <th className="border px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th
                  className="border px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("value")}
                >
                  <div className="flex items-center">
                    Value
                    {orderBy === "value" ? (
                      order === "asc" ? (
                        <FaSortUp className="ml-2" />
                      ) : (
                        <FaSortDown className="ml-2" />
                      )
                    ) : (
                      <FaSort className="ml-2" />
                    )}
                  </div>
                </th>
                <th className="border px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  isPublic
                </th>
                <th className="border px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  isActive
                </th>
                <th className="border px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataFiltered.map((items) => (
                <tr key={items.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{items.id}</td>
                  <td className="px-4 py-2 border">{items.value}</td>
                  <td className="px-4 py-2 border text-center">
                    {items.isPublic ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Public
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Public
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {items.isActive ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center w-5">
                    <button
                      onClick={() => openUpdateModal(items.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {notFound && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 whitespace-nowrap text-center"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailAttributeKey;
