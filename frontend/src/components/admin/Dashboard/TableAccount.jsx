import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import React from "react";
import CallApi from "../../../service/CallAPI";

export default function TableAccount() {
  const [rows, setRows] = React.useState([]);
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
      setRows(
        result.data.map((item) => ({
          email: item.account.email,
          name: item.fullName,
          role: item.account.role,
        }))
      );
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };
  React.useEffect(() => {
    getData(0, 5);
  }, []);
  return (
    <TableContainer component={Paper} className="col-span-2">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <h1 className="font-bold">Họ và tên</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Email</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Vai trò</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                {row.role == "USER" ? "Người dùng" : "Chủ cơ sở"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
