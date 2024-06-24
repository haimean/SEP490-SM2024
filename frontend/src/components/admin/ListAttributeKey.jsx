import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const AttributeTable = ({
  title,
  urlDetail,
  attributeList,
  openCreateModal,
  openUpdateModal,
}) => {
  const [filterName, setFilterName] = useState("");

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên thuộc tính",
      width: 250,
      renderCell: (params) => (
        <Link to={`${urlDetail}/${params.row.id}`} className="text-blue-600">
          {params.value}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 500,
      renderCell: (params) => params.value,
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      description: "Cột chứa dữ liệu không thể sắp xếp",
      sortable: false,
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Kích hoạt
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Chưa kích hoạt
          </span>
        ),
    },
    {
      field: "action",
      headerName: "Hành động",
      description: "Cột chứa dữ liệu không thể sắp xếp",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          onClick={() => openUpdateModal(params.row.id)}
          className={"text-blue-600"}
        >
          {"SỬA"}
        </Button>
      ),
    },
  ];

  const filteredRows = attributeList.filter(
    (row) =>
      row.name.toLowerCase().includes(filterName.toLowerCase()) ||
      row.description.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
        <div className="flex justify-between mb-4">
          <TextField
            value={filterName}
            onChange={handleFilterByName}
            placeholder="Search..."
            variant="outlined"
            size="small"
            className="w-1/3"
          />
          <Button onClick={openCreateModal} variant="contained" color="primary">
            thêm mới
          </Button>
        </div>
        <h1 className="text-center mb-4 text-2xl font-bold">
          {title.toUpperCase()}
        </h1>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooter
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default AttributeTable;
