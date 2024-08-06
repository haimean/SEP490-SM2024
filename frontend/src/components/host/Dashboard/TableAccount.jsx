import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableAccount() {
  const [rows, setRows] = useState([
    { email: "user1@example.com", name: "User One", role: "Admin" },
    { email: "user2@example.com", name: "User Two", role: "User" },
    { email: "user3@example.com", name: "User Three", role: "Host" },
    { email: "user4@example.com", name: "User Four", role: "User" },
    { email: "user5@example.com", name: "User Five", role: "Admin" },
  ]);

  useEffect(() => {
    // Bạn có thể thay thế đoạn mã này bằng lời gọi API thực tế khi có
    // const getData = async (page, pageSize) => {
    //   try {
    //     const result = await CallApi("/api/admin/account/", "post", {
    //       sort: { isVerified: "asc" },
    //       pagination: { page: page + 1, perPage: pageSize },
    //     });
    //     setRows(
    //       result.data.map((item) => ({
    //         email: item.account.email,
    //         name: item.fullName,
    //         role: item.account.role,
    //       }))
    //     );
    //   } catch (error) {
    //     toast.error(error.response?.data?.error);
    //   }
    // };
    // getData(1, 5);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Họ và tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
