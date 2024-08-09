import { Button, Dialog, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CallApi from "../../../service/CallAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalProfile from "../../common/ModalProfile";
import { getRatingDescription } from "../../../utils/user/GetRatingDescription";

const processData = (data) => {
  return data.map((item, index) => ({
    orderNumber: index + 1,
    id: item?.id,
    fullName: item?.account?.user?.fullName || "",
    level: getRatingDescription(item?.level),
    // Add other fields as needed
  }));
};

export default function WaitingListTable2({ open, onClose, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalProfile, setIsModalProfile] = useState(false);
  const [profileId, setProfileId] = useState();
  const columns = [
    { field: "orderNumber", headerName: "STT", width: 70, sortable: false },
    {
      field: "fullName",
      headerName: "Họ tên",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() => handleOpenModalProfile(params?.row?.id)}
            className="hover:underline hover:cursor-pointer"
          >
            {params?.row?.fullName}
          </div>
        );
      },
    },
    {
      field: "level",
      headerName: "Trình độ",
      width: 150,
    },
    {
      field: "rate",
      headerName: "Đánh giá",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="w-full h-full flex items-center">
            <Rating value={5} />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            console.log("🚀 ========= event:", event);
            event.stopPropagation();
            return sendInvitation(params.row.id);
          }}
        >
          Mời
        </Button>
      ),
    },
  ];
  const [listInvitation, setListInvitation] = useState([]);
  const getListInvitation = async () => {
    setIsLoading(true);
    try {
      const result = await CallApi(
        `/api/user/user-available/${postId}/get-user-free`,
        "post"
      );
      setIsLoading(false);
      console.log("🚀 ========= result:", result);
      setListInvitation(processData(result?.data || []));
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getListInvitation();
  }, []);
  const sendInvitation = async (id) => {
    try {
      const result = await CallApi(
        "/api/user/invitation/requests-to-match",
        "post",
        {
          postId: postId,
          userAvailabilityId: id,
        }
      );
      toast.success("Mời thành công");
      getListInvitation();
      console.log("🚀 ========= result:", result);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(error.response?.data?.error);
    }
  };
  const handleOpenModalProfile = (id) => {
    setProfileId(id);
    setIsModalProfile(true);
  };
  const handleCloseModalProfile = () => {
    setIsModalProfile(false);
  };
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={listInvitation}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
          loading={isLoading}
          localeText={localeText}
        />
      </div>
      {isModalProfile && (
        <ModalProfile
          open={isModalProfile}
          onClose={handleCloseModalProfile}
          id={profileId}
        />
      )}
    </Dialog>
  );
}
