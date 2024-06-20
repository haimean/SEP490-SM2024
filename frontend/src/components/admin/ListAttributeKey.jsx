import React, { useState } from "react";
import { FaPlus, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const headLabel = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "isActive", label: "Active", align: "center" },
  { id: "", label: "Action" },
];

const applyFilter = ({ inputData, comparator, filterName }) => {
  return inputData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase()) ||
        item.description.toLowerCase().includes(filterName.toLowerCase())
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

const AttributeTable = ({
  title,
  urlDetail,
  attributeList,
  openCreateModal,
  openUpdateModal,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [filterName, setFilterName] = useState("");

  const handleSort = (id) => {
    if (id === "name") {
      const isAsc = orderBy === id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: attributeList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
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
            <span className="text-white uppercase">{title}</span>
          </button>
        </div>
        <h1 className="text-center mb-4 text-2xl font-bold">
          {title.toUpperCase()}
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow">
            <thead>
              <tr>
                {headLabel.map((headCell) => (
                  <th
                    key={headCell.id}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      headCell.align === "center" ? "text-center" : ""
                    } ${headCell.id === "name" ? "cursor-pointer" : ""}`}
                    onClick={() => handleSort(headCell.id)}
                  >
                    <div className="flex items-center">
                      {headCell.label}
                      {headCell.id === "name" &&
                        (orderBy === headCell.id ? (
                          order === "asc" ? (
                            <FaSortUp className="ml-2" />
                          ) : (
                            <FaSortDown className="ml-2" />
                          )
                        ) : (
                          <FaSort className="ml-2" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataFiltered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center w-10">
                    {row.id}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`${urlDetail}/${row.id}`}
                      className="text-blue-600"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="text-sm text-gray-500">
                      {row.description}
                    </div>
                  </td>
                  <td className="px-4 py-2 border text-center w-5">
                    {row.isActive ? (
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
                      onClick={() => openUpdateModal(row.id)}
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

export default AttributeTable;
