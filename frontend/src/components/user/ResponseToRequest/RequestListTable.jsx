import { useState } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog"; // Import Dialog from MUI
import { users as initialUsers } from "../../../_mock/user/waitingList.js";

import TableNoData from "../../../sections/admin/user/table-no-data.jsx";
import RequestListRow from "./RequestListRow.jsx";
import TableHeadCP from "../../common/TableHeadCP.jsx";
import TableEmptyRows from "../../../sections/admin/user/table-empty-rows.jsx";
import TableToolbar from "../../common/TableToolbar.jsx";
import { emptyRows, applyFilter, getComparator } from "../../../utils/TableUtils.jsx";

// ----------------------------------------------------------------------

export default function RequestListTable({ open, onClose }) {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterName, setFilterName] = useState("");
    const [filterLevel, setFilterLevel] = useState("");
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

    const handleFilterByLevel = (event) => {
        setPage(0);
        setFilterLevel(event.target.value);
    };

    const handleContinue = (name) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.name !== name));
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    }).filter((user) => !filterLevel || user.level === filterLevel);

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
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
                                { id: "name", label: "Tên", width: "25%" },
                                { id: "level", label: "Trình độ", width: "20%" },
                                { id: "friendliness", label: "Thân thiện", align: "center", width: "20%" },
                                { id: "", align: "center", width: "30%" },
                            ]}
                        />
                        <TableBody>
                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <RequestListRow
                                        key={row.id}
                                        row={row}
                                        handleContinue={handleContinue}
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
                    rowsPerPageOptions={[5, 10, 20]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số hàng mỗi trang:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} trên ${count !== -1 ? count : `hơn ${to}`}`
                    }
                    getItemAriaLabel={(type) => {
                        if (type === 'first') {
                            return 'Trang đầu tiên';
                        } else if (type === 'last') {
                            return 'Trang cuối cùng';
                        } else if (type === 'next') {
                            return 'Trang tiếp theo';
                        } else if (type === 'previous') {
                            return 'Trang trước đó';
                        }
                        return '';
                    }}
                />
            </Card>
        </Dialog>
    );
}
