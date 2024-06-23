import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CallApi from "../../../../service/CallAPI";
import { toast } from "react-toastify";
import { TablePagination } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 400 },
  {
    field: "name",
    headerName: "Full name",
    description: "This column has a value getter và is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "isVerify",
    headerName: "Trạng thái kích hoạt",
    description: "This column has a value getter và is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => (params ? "Active" : "Chưa active"),
  },
  {
    field: "isActive",
    headerName: "Status",
    description: "This column has a value getter và is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => (params ? "Active" : "Ban"),
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
  // const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  // const [totalRows, setTotalRows] = React.useState(0); // New state for total rows
  console.log("🚀 ========= rows:", rows);

  const getData = async (page, pageSize) => {
    try {
      const result = await CallApi("/api/admin/account/", "post", {
        sort: {
          isVerified: "asc",
        },
        pagination: {
          page: page + 1, // Ensure the page number is correct
          perPage: pageSize,
        },
      });
      console.log("🚀 ========= result:", result);
      // setData(result.data); // Adjust this according to your API response structure
      // setTotalRows(result.totalRecords); // Assuming your API returns the total record count
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

  React.useEffect(() => {
    getData(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (event, newPage) => {
    console.log("🚀 ========= newPage:", newPage);
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event);
    setPage(0); // Reset to first page when page size changes
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: pageSize },
          },
        }}
        // pageSizeOptions={[5, 10]}

        pageSizeOptions={[5, 10]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        checkboxSelection
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={12} // Use the total rows state
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </div>
  );
}
