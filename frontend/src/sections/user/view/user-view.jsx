import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CallApi from "../../../services/CallApi";
import { toast } from "react-toastify";
import { TablePagination } from "@mui/material";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 400 },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
  {
    field: "name",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "isVerify",
    headerName: "Trạng thái kích hoạt",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => (value ? "Active" : "Chưa active"),
  },
  {
    field: "isActive",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => (value ? "Active" : "Ban"),
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 120,
  },
  {
    field: "role",
    headerName: "Role",
    width: 90,
  },
];
export default function DataTable() {
  const [data, setData] = React.useState([]);
  console.log("🚀 ========= data:", data);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await CallApi("/api/admin/account/", "post", {
          sort: {
            isVerified: "asc",
          },
          pagination: {
            page: page + 1, // Ensure the page number is correct
            perPage: rowsPerPage,
          },
        });
        console.log("🚀 ========= result:", result);
        setData(result.data); // Adjust this according to your API response structure
        setRows(
          result.data.map((item) => ({
            id: item.id,
            email: item.account.email,
            name: item.name,
            isVerify: item.account.isVerified,
            isActive: item.account.isActive,
            phoneNumber: item.numberPhone,
            role: item.account.role,
          }))
        );
      } catch (error) {
        toast.error(error.response?.data?.error);
      }
    };
    getData();
  }, [page, rowsPerPage]);
  const handleChangePage = (event, newPage) => {
    console.log("🚀 ========= newPage:", newPage);
    console.log("🚀 ========= event:", event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("🚀 ========= event:", event);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={rowsPerPage}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: rowsPerPage },
          },
        }}
        // pageSizeOptions={[5, 10]}

        // pageSizeOptions={[5, 10]}
        // onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
        checkboxSelection
      />
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={12}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
