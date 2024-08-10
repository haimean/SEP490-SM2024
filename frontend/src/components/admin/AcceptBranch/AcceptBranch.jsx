import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Checkbox } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const AcceptBranch = () => {
  const [filterName, setFilterName] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await CallApi("/api/admin/branches", "get");
      setBranches(response?.data);
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
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn chấp thuận chi nhánh này?"
      );
      if (isConfirmed) {
        try {
          await CallApi(`/api/admin/branches/${id}/set-accept`, "put");
          toast.success("Chấp thuận thành công");
          fetchBranches(); // Refresh the list after successful update
        } catch (error) {
          toast.error("Có lỗi xảy ra khi chấp thuận");
          console.error("Error accepting branch:", error);
        }
      }
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "STT",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <div className="font-bold">STT</div>,
    },
    {
      field: "name",
      headerName: "Tên chi nhánh",
      width: 250,
      renderHeader: () => <div className="font-bold">Tên chi nhán</div>,
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

  const filteredRows = branches.filter((row) =>
    row.name.toLowerCase().includes(filterName.toLowerCase())
  );
  console.log("🚀 ========= filteredRows:", filteredRows);

  return (
    <div className="flex justify-center py-2">
      <div className="max-w-6xl w-full p-10 border rounded-lg shadow bg-white">
        <h1 className="text-center mb-4 text-2xl font-bold">
          Danh sách chi nhánh cần duyệt
        </h1>
        <div className="flex justify-between mb-4">
          <TextField
            value={filterName}
            onChange={handleFilterByName}
            placeholder="Tìm kiếm theo tên chi nhánh"
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
    </div>
  );
};

export default AcceptBranch;
