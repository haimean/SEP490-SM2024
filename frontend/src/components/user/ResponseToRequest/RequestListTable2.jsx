import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { Button, Dialog, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import ModalProfile from "../../common/ModalProfile";
import { getRatingDescription } from "../../../utils/user/GetRatingDescription";
import ModalVote from "./ModalVote";
const processData = (data) => {
  return data?.map((item, index) => ({
    orderNumber: index + 1,
    id: item?.id,
    fullName: item?.account?.user?.fullName || "",
    level: getRatingDescription(item?.level),
    invitation: item?.Invitation,
    vote: item?.Invitation,
    // Add other fields as needed
  }));
};
export default function RequestListTable2({ open, onClose, postId }) {
  const [listAccept, setListAccept] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalProfile, setIsModalProfile] = useState(false);
  const [profileId, setProfileId] = useState();
  const [isModalVote, setIsModalVote] = useState(false);
  const [idSend, setIsSend] = useState();
  const [idReceive, setIsReceive] = useState();

  const columns = [
    { field: "orderNumber", headerName: "STT", width: 50, sortable: false },
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
      width: 100,
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
    {
      field: "vote",
      headerName: "Đánh giá",
      width: 140,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              console.log("🚀 ========= params:", params.row);
              handleOpenModalVote(params?.row?.id);
            }}
          >
            Đánh giá
          </Button>
        );
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
  const handleOpenModalVote = (idReceive) => {
    setIsReceive(idReceive);
    setIsModalVote(true);
  };
  const handleCloseModalVote = () => {
    setIsModalVote(false);
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
      {isModalVote && (
        <ModalVote
          open={isModalVote}
          handleClose={handleCloseModalVote}
          idReceive={idReceive}
          idSend={idSend}
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
