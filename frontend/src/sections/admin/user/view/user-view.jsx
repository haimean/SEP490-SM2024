import * as React from "react";
import CallApi from "../../../../service/CallAPI";
import { toast } from "react-toastify";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
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
      console.log("🚀 ========= result1:", result.total);
      setTotalRecords(result.total);
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
  const banAccount = async (id) => {
    try {
      const confirmBan = window.confirm("Bạn muốn ban tài khoản không?");
      if (!confirmBan) return;

      const result = await CallApi(`/api/admin/account/ban/${id}`, "put");
      console.log("🚀 ========= result1:", result);
      getData(page, pageSize);
      toast.success("Ban thành công");
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };
  React.useEffect(() => {
    getData(page, pageSize);
  }, [page, pageSize]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h1 className="font-bold">ID</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Email</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Họ và tên</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Trạng thái hoạt động</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Trang thái kích hoạt</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Số điện thoại</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Role</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Action</h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.isVerify ? "Kích hoạt" : "Chưa kích hoạt"}
                </TableCell>
                <TableCell>
                  {row.isActive ? "Kích hoạt" : "Chưa kích hoạt"}
                </TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => banAccount(row.id)}
                  >
                    <RemoveCircleIcon className="text-red-500" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRecords}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
