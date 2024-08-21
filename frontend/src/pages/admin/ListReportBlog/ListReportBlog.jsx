import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, TextField } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import ModalBlogAdmin from "../../../components/admin/ReportBlog/ModalBlogAdmin";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

const ListReportBlog = () => {
  const [filterName, setFilterName] = useState("");
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openDialog, DialogComponent } = useDialogConfirm();

  const columns = [
    {
      field: "reason",
      headerName: "Lý do báo cáo",
      width: 150,
      sortable: false,
      renderHeader: () => <div className="font-bold">Lý do báo cáo</div>,
    },
    {
      field: "account",
      headerName: "Email người tố cáo",
      width: 180,
      sortable: false,
      renderHeader: () => <div className="font-bold">Email người tố cáo</div>,
      renderCell: (params) => params?.row?.account?.email,
    },
    {
      field: "caption",
      headerName: "Bài đăng",
      width: 250,
      sortable: false,
      renderHeader: () => <div className="font-bold">Bài đăng</div>,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          className="hover:underline"
          onClick={() => handleOpenModal(params.row.blog)}
        >
          {params?.row?.blog?.caption}
        </div>
      ),
    },
    {
      field: "blog",
      headerName: "Email chủ bài đăng",
      width: 200,
      sortable: false,
      renderHeader: () => <div className="font-bold">Email chủ bài đăng</div>,
      renderCell: (params) => params?.row?.blog?.account?.email,
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <div className="font-bold">Hành động</div>,
      renderCell: (params) => {
        const handleApprove = async () => {
          openDialog(
            "Bạn có chắc chắn muốn duyệt tố cáo này không?",
            async () => {
              try {
                await CallApi(
                  `/api/admin/blog/report-ban/${params.row.id}`,
                  "post"
                );
                toast.success("Duyệt tố cáo thành công");
                fetchReports();
              } catch (error) {
                toast.error("Duyệt tố cáo thất bại");
                console.log(
                  "=============== approve report ERROR: " +
                    error.response?.data?.error
                );
              }
            }
          );
        };

        const handleReject = async () => {
          openDialog(
            "Bạn có chắc chắn muốn hủy tố cáo này không?",
            async () => {
              try {
                await CallApi(
                  `/api/admin/blog/report/${params.row.id}`,
                  "delete"
                );
                toast.success("Hủy tố cáo thành công");
                fetchReports();
              } catch (error) {
                toast.error("Hủy tố cáo thất bại");
                console.log(
                  "=============== reject report ERROR: " +
                    error.response?.data?.error
                );
              }
            }
          );
        };

        return (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleApprove}>
              Duyệt
            </Button>
            <Button variant="contained" color="error" onClick={handleReject}>
              Hủy
            </Button>
          </Stack>
        );
      },
    },
  ];

  const fetchReports = async () => {
    const requestData = {
      pagination: {
        page: page + 1,
        perPage: pageSize,
      },
    };
    try {
      const response = await CallApi(
        "/api/admin/blog/report",
        "post",
        requestData
      );
      setReports(response?.data?.reports);
      setTotalRows(response?.data?.total || 0);
    } catch (error) {
      console.log(
        "=============== fetch list report blog ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredRows = reports.filter((row) =>
    row.reason.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    fetchReports();
  }, [page, pageSize]);
  console.log(reports);
  const localeText = {
    // Add other localized text as needed
    noRowsLabel: "Không có dữ liệu",
    footerTotalRows: "Tổng số hàng:",
    MuiTablePagination: {
      labelRowsPerPage: "Số hàng mỗi trang:",
      labelDisplayedRows: ({ from, to, count }) =>
        `${from} - ${to} trên ${count !== -1 ? count : `hơn ${to}`}`,
    },
  };
  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
        <h1 className="text-center mb-4 text-2xl font-bold">
          Danh sách tố cáo bài đăng trạng thái
        </h1>
        <div className="flex justify-between mb-4">
          <TextField
            value={filterName}
            onChange={handleFilterByName}
            placeholder="Tìm kiếm theo lý do"
            variant="outlined"
            size="small"
            className="w-1/3"
          />
        </div>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            disableColumnMenu
            autoHeight
            pagination
            paginationMode="server"
            rowCount={totalRows}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(newModel) => {
              setPage(newModel.page);
              setPageSize(newModel.pageSize);
            }}
            pageSizeOptions={[5, 10, 25]}
            localeText={localeText}
            sx={{
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
            }}
          />
        </div>
      </div>
      <DialogComponent />
      <ModalBlogAdmin
        open={isModalOpen}
        onClose={handleCloseModal}
        blog={selectedBlog}
      />
    </div>
  );
};

export default ListReportBlog;
