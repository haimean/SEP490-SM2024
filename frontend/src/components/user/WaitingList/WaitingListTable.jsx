import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import { users as initialUsers } from "../../../_mock/user/waitingList.js";
import TableNoData from "../../../sections/admin/user/table-no-data.jsx";
import WatingListRow from "./WatingListRow.jsx";
import TableHeadCP from "../../common/TableHeadCP.jsx";
import TableEmptyRows from "../../../sections/admin/user/table-empty-rows.jsx";
import TableToolbar from "../../common/TableToolbar.jsx";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../../utils/TableUtils.jsx";
import CallApi from "../../../service/CallAPI.jsx";

// ----------------------------------------------------------------------

export default function WaitingListTable({ open, onClose, postId }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState(initialUsers);
  const [listInvitation, setListInvitation] = useState([]);
  const getListInvitation = async () => {
    try {
      const result = await CallApi(`/api/user/post/${postId}`, "get");
      setListInvitation(result.data.invitation);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getListInvitation();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterByLevel = (event) => {
    setPage(0);
    setFilterLevel(event.target.value);
  };

  const handleInvite = (name) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.name !== name));
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  }).filter((user) => !filterLevel || user.level === filterLevel);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <Card>
        <TableToolbar
          inputPlaceholder="Tên người chơi"
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterLevel={filterLevel}
          onFilterLevel={handleFilterByLevel}
          onCloseModal={onClose}
        />
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCP
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSort}
              headLabel={[
                // { id: "email", label: "Email", width: "20%" },
                { id: "fullName", label: "Tên", width: "20%" },
                { id: "gender", label: "Giới tính", width: "20%" },
                {
                  id: "friendliness",
                  label: "Đánh giá",
                  align: "center",
                  width: "20%",
                },
                { id: "", align: "center", width: "20%" },
              ]}
            />
            <TableBody>
              {listInvitation
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <WatingListRow
                    key={row.id}
                    row={row}
                    handleInvite={handleInvite}
                    postId={postId}
                  />
                ))}
              <TableEmptyRows
                height={69.3}
                emptyRows={emptyRows(page, rowsPerPage, users.length)}
              />
              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trên ${count !== -1 ? count : `hơn ${to}`}`
          }
          getItemAriaLabel={(type) => {
            if (type === "first") {
              return "Trang đầu tiên";
            } else if (type === "last") {
              return "Trang cuối cùng";
            } else if (type === "next") {
              return "Trang tiếp theo";
            } else if (type === "previous") {
              return "Trang trước đó";
            }
            return "";
          }}
        />
      </Card>
    </Dialog>
  );
}
