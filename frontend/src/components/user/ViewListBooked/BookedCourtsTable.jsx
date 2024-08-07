import { useState } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { bookedCourts as initialData } from "../../../_mock/user/bookedCourts";
import TableNoData from "../../../sections/admin/user/table-no-data";
import BookedCourtsRow from "./BookedCourtsRow";
import TableHeadCP from "../../common/TableHeadCP";
import TableEmptyRows from "../../../sections/admin/user/table-empty-rows";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../../utils/TableUtils";
import { Container } from "@mui/material";

// ----------------------------------------------------------------------

export default function RequestListTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("courtName");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [bookedCourts, setBookedCourts] = useState(initialData);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const dataFiltered = applyFilter({
    inputData: bookedCourts,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Card>
        <TableContainer className="max-h-[calc(100vh-300px)]">
          <Table className="min-w-[800px]">
            <TableHeadCP
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSort}
              headLabel={[
                { id: "courtName", label: "Tên sân", width: "20%" },
                { id: "bookingDate", label: "Ngày đặt", width: "20%" },
                { id: "timeSlot", label: "Khung giờ", width: "20%" },
                { id: "post", label: "Bài đăng", width: "20%" },
                { id: "status", label: "Tình trạng", width: "20%" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <BookedCourtsRow key={row.id} row={row} />
                ))}
              <TableEmptyRows
                height={69.3}
                emptyRows={emptyRows(page, rowsPerPage, bookedCourts.length)}
              />
              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={bookedCourts.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 20]}
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
    </Container>
  );
}
