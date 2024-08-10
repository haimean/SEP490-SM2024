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
      field: "index",
      headerName: "Stt",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên chi nhánh",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 180,
    },
    {
      field: "businessLicense",
      headerName: "Giấy phép kinh doanh",
      width: 230,
    },
    {
      field: "accept",
      headerName: "Chấp thuận",
      width: 100,
      headerAlign: "center",
      align: "center",
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
            rows={branches}
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
