import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
// import WaitingListTable from "../../../components/user/WaitingList/WaitingListTable.jsx";
// import RequestListTable from "../../../components/user/ResponseToRequest/RequestListTable.jsx";
import CallApi from "../../../service/CallAPI.jsx";
import WaitingListTable2 from "../WaitingList/WaitingListTable2.jsx";
import RequestListTable2 from "../ResponseToRequest/RequestListTable2.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import ModalProfile from "../../common/ModalProfile.jsx";
import ModalReason from "../../common/ModalReason.jsx";
import { useForm } from "react-hook-form";

const PostRightCP = ({ user, post, postId }) => {
  const [accountId, setAccountId] = useState(null);
  const [listJoin, setListJoin] = useState([]);
  const [openWaitingList, setOpenWaitingList] = useState(false);
  const [openRequestList, setOpenRequestList] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openModalReason, setOpenModalReason] = useState(false);
  const [profileId, setProfileId] = useState();
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
  const handleOpenWaitingList = () => setOpenWaitingList(true);
  const handleCloseWaitingList = () => setOpenWaitingList(false);

  const handleOpenRequestList = () => setOpenRequestList(true);
  const handleCloseRequestList = () => setOpenRequestList(false);

  const handleCloseProfile = () => setOpenProfile(false);
  const handleOpenDetail = (id) => {
    setOpenProfile(true);
    setProfileId(id);
  };
  const getListInvitation = async () => {
    try {
      const result = await CallApi(
        `/api/user/user-available/${postId}/get-user-accept`,
        "post"
      );
      console.log("🚀 ========= listjoin:", result.data);
      setListJoin(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    // Lấy accountId từ localStorage
    const storedAccountId = localStorage.getItem("accountId");
    setAccountId(storedAccountId);
  }, []);
  useEffect(() => {
    getListInvitation();
  }, [openWaitingList, openRequestList]);
  const isOwner = Number(accountId) === post?.booking?.accountId;
  const requestJoin = async (id) => {
    try {
      await CallApi(`/api/user/invitation/invite`, "post", {
        postId: id,
      });
      toast.success("Yêu cầu tham gia thành công");
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const deletePlayer = async (id, status, reason) => {
    try {
      const result = await CallApi("/api/user/invitation/update", "post", {
        invitationId: id,
        status: status,
        reasonCancel: reason,
      });
      toast.success("Hủy thành công");
      getListInvitation();
      console.log("🚀 ========= result:", result);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(error.response?.data?.error);
    }
  };
  const onSubmit = (data) => {
    deletePlayer(data.id, "CANCEL", data.reason);
    setOpenModalReason(false);
    // Thực hiện gửi dữ liệu hoặc các hành động khác ở đây
  };
  const handleCloseModalReason = () => setOpenModalReason(false);
  const handleOpenModalReason = (id) => {
    setValue("id", id);
    setOpenModalReason(true);
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, p: 2 }}>
        <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto">
          <div className="flex justify-center mb-4">
            <Avatar
              alt={user?.name}
              src={user?.avatarUrl}
              className="w-24 h-24"
            />
          </div>
          <Typography variant="h6" align="center" className="mt-2">
            {user?.name}
          </Typography>
          <Typography variant="body1" align="center" className="text-gray-600">
            {user?.level}
          </Typography>
          <div className="flex items-center justify-center mt-2">
            <StarIcon className="text-yellow-300" />
            <span className="ml-1 text-gray-600">{user?.friendliness}</span>
          </div>
          <Typography
            variant="body1"
            align="center"
            className="text-gray-600 mt-2"
          >
            Liên hệ: {user?.numberPhone}
          </Typography>
          <div className="mt-4 flex justify-center space-x-2">
            {isOwner ? (
              <>
                <Button variant="contained" onClick={handleOpenWaitingList}>
                  Mời người chơi
                </Button>
                {openWaitingList && (
                  <WaitingListTable2
                    open={openWaitingList}
                    onClose={handleCloseWaitingList}
                    postId={postId}
                  />
                )}
                {/* <WaitingListTable
                  open={openWaitingList}
                  onClose={handleCloseWaitingList}
                  postId={postId}
                /> */}
                <Button variant="contained" onClick={handleOpenRequestList}>
                  Xem danh sách chờ
                </Button>
                <RequestListTable2
                  open={openRequestList}
                  onClose={handleCloseRequestList}
                  postId={postId}
                />
                {/* <RequestListTable
                  open={openRequestList}
                  onClose={handleCloseRequestList}
                  postId={postId}
                /> */}
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => requestJoin(postId)}
                disabled={listJoin?.length == post?.numberMember}
              >
                {listJoin?.length == post?.numberMember
                  ? "Sẫn đã đủ người"
                  : "Gửi lời mời tham gia"}
              </Button>
            )}
          </div>
        </div>
        <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto mt-4">
          <Typography className="mt-2">
            Có {listJoin?.length} / {post?.numberMember} người chơi
          </Typography>
        </div>
        {isOwner && (
          <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto mt-4">
            <Typography className="mt-2">Danh sách người tham gia</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {listJoin.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell
                        onClick={() => handleOpenDetail(item?.accountId)}
                        className="hover:underline hover:cursor-pointer"
                      >
                        {item?.account?.user?.fullName}
                      </TableCell>
                      {isOwner && (
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleOpenModalReason(item?.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {openModalReason && (
              <ModalReason
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                open={openModalReason}
                onClose={handleCloseModalReason}
              />
            )}
            {openProfile && (
              <ModalProfile
                open={openProfile}
                onClose={handleCloseProfile}
                id={profileId}
              />
            )}
          </div>
        )}
      </Paper>
    </Grid>
  );
};
export default PostRightCP;
