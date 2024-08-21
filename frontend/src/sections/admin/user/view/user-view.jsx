import * as React from "react";
import CallApi from "../../../../service/CallAPI";
import { toast } from "react-toastify";
import {
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DoneIcon from "@mui/icons-material/Done";
import Loading from "../../../../components/common/Loading";
import ModalReason from "../../../../components/common/ModalReason";
import { useForm } from "react-hook-form";
export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openModalReason, setOpenModalReason] = React.useState(false);
  const getData = async (page, pageSize) => {
    setIsLoading(true);
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
      setTotalRecords(result.total);
      setRows(
        result.data.map((item) => ({
          accountId: item.accountId,
          id: item.id,
          email: item.account.email,
          name: item.fullName,
          isVerify: item.account.isVerified,
          isActive: item.account.isActive,
          phoneNumber: item.numberPhone,
          role: item.account.role,
        }))
      );
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };
  const banAccount = async (id, reason) => {
    setIsLoading(true);
    try {
      const result = await CallApi(`/api/admin/account/ban/${id}`, "put", {
        reason,
      });
      console.log("🚀 ========= result1:", result);
      getData(page, pageSize);
      setIsLoading(false);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      reason: "", // Giá trị mặc định của trường nhập liệu
      id: "", // Giá trị mặc định của id
    },
  });
  const onSubmit = (data) => {
    banAccount(data.id, data.reason);
    setOpenModalReason(false);
    // Thực hiện gửi dữ liệu hoặc các hành động khác ở đây
  };
  const handleOpenModalReason = (id) => {
    setValue("id", id);
    setOpenModalReason(true);
  };

  const handleCloseModal = () => setOpenModalReason(false);
  return isLoading ? (
    <Loading />
  ) : (
    <div style={{ height: 500, width: "100%" }}>
      <h1 className="text-center mb-4 text-2xl font-bold">
        Danh sách tài khoản
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h1 className="font-bold">STT</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Email</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Họ và tên</h1>
              </TableCell>
              <TableCell align="center">
                <h1 className="font-bold">Trạng thái hoạt động</h1>
              </TableCell>
              <TableCell align="center">
                <h1 className="font-bold">Số điện thoại</h1>
              </TableCell>
              <TableCell align="center">
                <h1 className="font-bold">Vai trò</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold"></h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell align="center">
                  {row.isActive ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Kích hoạt
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Chưa kích hoạt
                    </span>
                  )}
                </TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell align="center">
                  {row.role == "USER" ? "Người dùng" : "Chủ cơ sở"}
                </TableCell>
                <TableCell align="center">
                  {row.isActive === true ? (
                    <Button
                      color="error"
                      onClick={() => handleOpenModalReason(row.accountId)}
                    >
                      Khóa tài khoản
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      size="24"
                      onClick={() => handleOpenModalReason(row.accountId)}
                    >
                      Mở khóa tài khoản
                    </Button>
                  )}
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
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} trong tổng số ${count !== -1 ? count : `hơn ${to}`}`
        } // Customize the label for displayed rows
      />
      {openModalReason && (
        <ModalReason
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          open={openModalReason}
          onClose={handleCloseModal}
          errors={errors}
          register={register}
        />
      )}
    </div>
  );
}
