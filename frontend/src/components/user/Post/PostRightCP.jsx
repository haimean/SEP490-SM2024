import { useEffect, useState } from "react";
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
import CallApi from "../../../service/CallAPI.jsx";
import WaitingListTable2 from "../WaitingList/WaitingListTable2.jsx";
import RequestListTable2 from "../ResponseToRequest/RequestListTable2.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import ModalProfile from "../../common/ModalProfile.jsx";
import ModalReason from "../../common/ModalReason.jsx";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LoginModal from "../../auth/LoginModal.jsx";
const PostRightCP = ({ user, post, postId }) => {
  const [accountId, setAccountId] = useState(null);
  const [listJoin, setListJoin] = useState([]);
  const [openWaitingList, setOpenWaitingList] = useState(false);
  const [openRequestList, setOpenRequestList] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openModalReason, setOpenModalReason] = useState(false);
  const [profileId, setProfileId] = useState();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const isLogin = useSelector((state) => state.user.user);
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
      console.log("🚀 ========= resultaaaaaaaaa:", result);
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
    if (isLogin) {
      try {
        await CallApi(`/api/user/invitation/invite`, "post", {
          postId: id,
        });
        detailUser();
        toast.success("Yêu cầu tham gia thành công");
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    } else {
      toast.error("Bạn chưa đăng nhập!");
      setOpenLoginModal(true);
    }
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
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

  const [detail, setDetail] = useState(false);
  const detailUser = async () => {
    try {
      const result = await CallApi(
        "/api/user/invitation/available-of-user",
        "post",
        {
          postId: postId,
        }
      );
      console.log("🚀 ========= result:", result.data);
      setDetail(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    detailUser();
  }, [postId]);
  const handleAccept = async (id, status, reason) => {
    try {
      const result = await CallApi("/api/user/invitation/update", "put", {
        invitationId: id,
        status: status,
        reasonCancel: reason,
      });
      if (status === "ACCEPT") {
        toast.success("Chấp nhận lời mời");
        detailUser();
        getListInvitation();
      } else {
        toast.info("Từ chối thành công");
      }
      console.log("🚀 ========= result:", result);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(error.response?.data?.error);
    }
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
                <Button
                  variant="contained"
                  onClick={handleOpenWaitingList}
                  disabled={listJoin?.length == post?.numberMember}
                >
                  Mời người chơi
                </Button>
                {openWaitingList && (
                  <WaitingListTable2
                    open={openWaitingList}
                    onClose={handleCloseWaitingList}
                    postId={postId}
                  />
                )}
                <Button
                  variant="contained"
                  onClick={handleOpenRequestList}
                  disabled={listJoin?.length == post?.numberMember}
                >
                  Xem danh sách chờ
                </Button>
                <RequestListTable2
                  open={openRequestList}
                  onClose={handleCloseRequestList}
                  postId={postId}
                />
              </>
            ) : (
              <div className="w-full flex justify-center">
                {detail?.status === "NEW" && detail?.type === "AVAILABLE" ? (
                  <div className="w-full h-full flex justify-between items-center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAccept(detail?.id, "ACCEPT", "Chấp nhận");
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
                        handleAccept(detail?.id, "NOACCEPT", "Không chấp nhận");
                      }}
                    >
                      Từ Chối
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => requestJoin(postId)}
                    disabled={
                      listJoin?.length == post?.numberMember ||
                      detail?.status == "ACCEPT" ||
                      detail?.status == "NEW"
                    }
                  >
                    {detail?.status == "ACCEPT"
                      ? "Đã tham gia trận đấu"
                      : listJoin?.length == post?.numberMember
                      ? "Sẫn đã đủ người"
                      : detail?.status == "NEW"
                      ? "Đã yêu cầu tham gia trận đấu"
                      : "Gửi lời mời tham gia"}
                  </Button>
                )}
              </div>
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
                  {listJoin.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
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
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
    </Grid>
  );
};
export default PostRightCP;
