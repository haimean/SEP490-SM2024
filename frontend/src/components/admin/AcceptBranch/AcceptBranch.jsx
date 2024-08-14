import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Checkbox } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

const AcceptBranch = () => {
  const [filterName, setFilterName] = useState("");
  const [branches, setBranches] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const { openDialog, DialogComponent } = useDialogConfirm();
  useEffect(() => {
    fetchBranches();
  }, []);

  const handleOpenImage = (imageUrl) => {
    setViewImage(imageUrl);
  };

  const handleCloseImage = () => {
    setViewImage(null);
  };

  const fetchBranches = async () => {
    try {
      const response = await CallApi("/api/admin/branches", "get");
      const data = response?.data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setBranches(data);
    } catch (error) {
      console.log(
        "=============== fetch list branch attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleAccept = async (id, isAccepted) => {
    if (isAccepted) {
      openDialog("Bạn có chắc chắn muốn chấp thuận cơ sở này?", async () => {
        try {
          await CallApi(`/api/admin/branches/${id}/set-accept`, "put");
          toast.success("Chấp thuận thành công");
          fetchBranches();
        } catch (error) {
          toast.error("Có lỗi xảy ra khi chấp thuận");
          console.error("Error accepting branch:", error);
        }
      });
    }
  };

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <div className="font-bold">STT</div>,
    },
    {
      field: "name",
      headerName: "Tên cơ sở",
      width: 250,
      renderHeader: () => <div className="font-bold">Tên cơ sở</div>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
      renderHeader: () => <div className="font-bold">Email</div>,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 180,
      renderHeader: () => <div className="font-bold">Số điện thoại</div>,
    },
    {
      field: "businessLicense",
      headerName: "Giấy phép kinh doanh",
      width: 230,
      renderHeader: () => <div className="font-bold">Giấy phép kinh doanh</div>,
      renderCell: (params) => (
        <div
          onClick={() => handleOpenImage(params.value)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={params.value}
            alt="Giấy phép kinh doanh"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        </div>
      ),
    },
    {
      field: "accept",
      headerName: "Chấp thuận",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <div className="font-bold">Chấp thuận</div>,

      renderCell: (params) => (
        <Checkbox
          checked={params.row.isAccept || false}
          onChange={(event) =>
            handleAccept(params.row.id, event.target.checked)
          }
          color="primary"
        />
      ),
    },
  ];
  const filteredRows = branches.filter(
    (row) =>
      row?.name?.toLowerCase().includes(filterName.toLowerCase()) ||
      row?.description?.toLowerCase().includes(filterName.toLowerCase())
  );
  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
        <h1 className="text-center mb-4 text-2xl font-bold">
          Danh sách cơ sở cần duyệt
        </h1>
        <div className="flex justify-between mb-4">
          <TextField
            value={filterName}
            onChange={handleFilterByName}
            placeholder="Tìm kiếm theo tên cơ sở"
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
            hideFooter
            autoHeight
          />
        </div>
      </div>
      <DialogComponent />
      {viewImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}
          onClick={handleCloseImage}
        >
          <img
            src={viewImage}
            alt="Business license"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AcceptBranch;
