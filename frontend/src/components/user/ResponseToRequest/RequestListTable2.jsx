import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { Button, Dialog, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormRequest from "./FormRequest";
import ModalProfile from "../../common/ModalProfile";
const processData = (data) => {
  return data.map((item) => ({
    id: item.id,
    avatar: item.account?.user?.avatar || "",
    fullName: item.account?.user?.fullName || "",
    level: item?.level,
    invitation: item.Invitation,
    // Add other fields as needed
  }));
};
export default function RequestListTable2({ open, onClose, postId }) {
  const [listAccept, setListAccept] = useState([]);
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
      renderCell: () => {
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
      width: 250,
      sortable: false,
      renderCell: (params) => {
        if (params.row?.invitation[0]?.type == "UNAVAILABLE") {
          return (
            <div className="w-full h-full flex justify-between items-center">
              <Button
                variant="contained"
                color="success"
                onClick={(event) => {
                  event.stopPropagation();
                  return handleAccept(
                    params.row?.invitation[0]?.id,
                    "ACCEPT",
                    "Chấp nhận"
                  );
                }}
              >
                Chấp nhận
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={(event) => {
                  console.log("🚀 ========= event:", event);
                  event.stopPropagation();
                  return handleAccept(
                    params.row?.invitation[0]?.id,
                    "NOACCEPT",
                    "Không chấp nhận"
                  );
                }}
              >
                Từ Chối
              </Button>
            </div>
          );
        } else {
          return (
            <div className="w-full h-full flex justify-between items-center">
              {params.row?.invitation[0]?.status === "NEW" && "Đã mời"}
            </div>
          );
        }
      },
    },
  ];
  const getListAccept = async () => {
    setIsLoading(true);
    try {
      const result = await CallApi(
        `/api/user/user-available/${postId}/get-user-match`,
        "post"
      );
      setIsLoading(false);
      console.log("🚀 ========= listAccept:", result);
      setListAccept(processData(result?.data || []));
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getListAccept();
  }, [open]);

  const handleAccept = async (id, status, reason) => {
    try {
      const result = await CallApi("/api/user/invitation/update", "post", {
        invitationId: id,
        status: status,
        reasonCancel: reason,
      });
      if (status === "ACCEPT") {
        toast.success("Chấp nhận lời mời");
      } else {
        toast.info("Từ chối thành công");
      }
      getListAccept();
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
          rows={listAccept}
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
RequestListTable2.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};
