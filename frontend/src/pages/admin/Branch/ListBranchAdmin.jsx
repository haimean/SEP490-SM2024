import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CallApi from "../../../service/CallAPI";

const ListBranchAdmin = () => {
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
      const data = response?.data?.data?.map((item, index) => ({
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

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <div className="font-bold">STT</div>,
    },
    {
      field: "name",
      headerName: "Tên cơ sở",
      width: 250,
      renderHeader: () => <div className="font-bold">Tên cơ sở</div>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
      renderHeader: () => <div className="font-bold">Email</div>,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 180,
      renderHeader: () => <div className="font-bold">Số điện thoại</div>,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 400,
      sortable: false,
      renderHeader: () => <div className="font-bold">Địa chỉ</div>,
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
