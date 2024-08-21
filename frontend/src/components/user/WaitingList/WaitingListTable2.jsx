import { Button, Dialog, Rating } from "@mui/material";
import { useEffect, useState } from "react";

import CallApi from "../../../service/CallAPI";
import { DataGrid } from "@mui/x-data-grid";
import ModalProfile from "../../common/ModalProfile";
import { getRatingDescription } from "../../../utils/user/GetRatingDescription";
import { toast } from "react-toastify";

export default function WaitingListTable2({ open, onClose, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalProfile, setIsModalProfile] = useState(false);
  const [profileId, setProfileId] = useState();
  const processData = async (data) => {
    console.log("🚀 ========= data:", data);
    const processedData = await Promise.all(
      data?.map(async (item, index) => {
        const rate = await getRating(item?.accountId);
        console.log("🚀 ========= rating:", rate);
        return {
          orderNumber: index + 1,
          id: item?.id,
          fullName: item?.account?.user?.fullName || "",
          numberPhone: item?.account?.user?.numberPhone || "",
          level: getRatingDescription(item?.level),
          invitation: item?.Invitation,
          vote: item?.Invitation,
          rate: rate?.rating || 0,
          // Add other fields as needed
        };
      })
    );
    return processedData;
  };
  const getRating = async (id) => {
    try {
      const result = await CallApi(`/api/user/review/get-review/${id}`);
      console.log("🚀 ========= rate:", result?.data[0]);
      return result?.data[0];
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const columns = [
    { field: "orderNumber", headerName: "STT", width: 70, sortable: false },
    {
      field: "fullName",
      headerName: "Họ tên",
      width: 250,
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
      field: "numberPhone",
      headerName: "Số điện thoại",
      width: 200,
      renderCell: (params) => {
        return <div>{params?.row?.numberPhone}</div>;
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
      const processedList = await processData(result?.data || []);
      setListInvitation(processedList);
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
