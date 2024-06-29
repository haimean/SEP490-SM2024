import { useState } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog"; // Import Dialog from MUI
import { users as initialUsers } from "../../../_mock/user/waitingList.js";

import TableNoData from "../../../sections/admin/user/table-no-data.jsx";
import WatingListRow from "./WatingListRow.jsx";
import WaitingListHead from "./WaitingListHead.jsx";
import TableEmptyRows from "../../../sections/admin/user/table-empty-rows.jsx";
import UserTableToolbar from "../../../sections/admin/user/user-table-toolbar.jsx";
import { emptyRows, applyFilter, getComparator } from "../../../sections/admin/user/utils.js";

// ----------------------------------------------------------------------

export default function WaitingListTable({ open, onClose }) {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState(initialUsers);

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

    const handleInvite = (name) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.name !== name));
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
            <Card>
                <UserTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />
                <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
                    <Table sx={{ minWidth: 800 }}>
                        <WaitingListHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleSort}
                            headLabel={[
                                { id: "name", label: "Name" },
                                { id: "title", label: "Title" },
                                { id: "level", label: "Trình độ" },
                                { id: "friendliness", label: "Thân thiện", align: "center" },
                                { id: "", align: "center" },
                            ]}
                        />
                        <TableBody>
                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <WatingListRow
                                        key={row.id}
                                        row={row}
                                        handleInvite={handleInvite}
                                    />
                                ))}
                            <TableEmptyRows
                                height={77}
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
                />
            </Card>
        </Dialog>
    );
}
