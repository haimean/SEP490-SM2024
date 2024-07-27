import { Button, Dialog, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CallApi from "../../../service/CallAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalProfile from "../../common/ModalProfile";

const processData = (data) => {
  return data.map((item) => ({
    id: item.id,
    avatar: item.account?.user?.avatar || "",
    fullName: item.account?.user?.fullName || "",
    level: item?.level,
    // Add other fields as needed
  }));
};

export default function WaitingListTable2({ open, onClose, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalProfile, setIsModalProfile] = useState(false);
  const [profileId, setProfileId] = useState();
  const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <div className="w-full h-full flex items-center">
          <img
            src={params.value}
            alt="Avatar"
            className="w-10 h-10 rounded-full m-auto"
          />
        </div>
      ),
    },
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
