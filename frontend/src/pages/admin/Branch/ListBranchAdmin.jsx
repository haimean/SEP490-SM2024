import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import CallApi from "../../../service/CallAPI";

const ListBranchAdmin = () => {
  const [filterName, setFilterName] = useState("");
  const [branches, setBranches] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchBranches();
  }, [page, pageSize]);

  const fetchBranches = async () => {
    const requestData = {
      pagination: {
        page: page + 1,
        perPage: pageSize,
      },
    };
    try {
      const response = await CallApi(
        "/api/admin/branches",
        "post",
        requestData
      );
      const data = response?.data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setBranches(data);
      setTotalRows(response?.data?.total || 0);
    } catch (error) {
      console.log(
        "=============== fetch list branch attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên chi nhánh",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 120,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 400,
      sortable: false,
      renderCell: (params) => {
        const address = params?.row?.address;
        return `${address?.detail ?? ""}${
          address?.wards ? ", " + address.wards : ""
        } ${address?.districts ? ", " + address.districts : ""} ${
          address?.provinces ? ", " + address.provinces : ""
        }`;
      },
    },
  ];

  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
        <h1 className="text-center mb-4 text-2xl font-bold">
          Danh sách chi nhánh đã duyệt
        </h1>
        <div className="flex justify-between mb-4">
          <TextField
            value={filterName}
            onChange={handleFilterByName}
            placeholder="Tìm kiếm theo tên chi nhánh"
            variant="outlined"
            size="small"
            className="w-1/3"
          />
        </div>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={branches}
            columns={columns}
            disableRowSelectionOnClick
            disableColumnMenu
            autoHeight
            pagination
            paginationMode="server"
            rowCount={totalRows}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(newModel) => {
              setPage(newModel.page);
              setPageSize(newModel.pageSize);
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBranchAdmin;
