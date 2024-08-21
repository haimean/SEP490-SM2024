/* eslint-disable react/prop-types */
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
import CallApi from "../../../service/CallAPI.jsx";
import WaitingListTable2 from "../WaitingList/WaitingListTable2.jsx";
import RequestListTable2 from "../ResponseToRequest/RequestListTable2.jsx";
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
  const [isModal, setIsModal] = useState(false); //nguoi choi xin vao tran roi muon huy tran khi da tham gia
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
  //check xem ai la chu bai post
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
      detailUser();
      console.log("🚀 ========= result:", result);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(error.response?.data?.error);
    }
  };
  const onSubmit = (data) => {
    deletePlayer(data.id, "CANCEL", data.reason);
    setOpenModalReason(false);
    setIsModal(false);
    // Thực hiện gửi dữ liệu hoặc các hành động khác ở đây
  };
  const handleCloseModalReason = () => setOpenModalReason(false);
  const handleOpenModalReason = (id) => {
    setValue("id", id);
    setOpenModalReason(true);
  };

  const handleCloseModal = () => setIsModal(false);
  const handleOpenModal = (id) => {
    setValue("id", id);
    setIsModal(true);
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
      console.log("🚀 ========= resultabcd:", result.data);
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
      const result = await CallApi("/api/user/invitation/update", "post", {
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
        detailUser();
        getListInvitation();
      }
      console.log("🚀 ========= result:", result);
    } catch (error) {
      console.log("🚀 ========= error:", error);
      toast.error(error.response?.data?.error);
    }
  };
  function hasTimePassed(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    if (currentDate > inputDate) {
      return true; //đã qua
    } else {
      return false; //chưa qua
    }
  }
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

          <Typography
            variant="body1"
            align="center"
            className="text-gray-600 mt-2"
          >
            Số điện thoại: {user?.numberPhone}
          </Typography>
          {hasTimePassed(post?.booking?.startTime) == true ? (
            <div className="w-full flex justify-center">
              <Button variant="contained" disabled>
                Trận đấu đã và đang diễn ra
              </Button>
            </div>
          ) : (
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
                          handleAccept(
                            detail?.id,
                            "NOACCEPT",
                            "Không chấp nhận"
                          );
                        }}
                      >
                        Từ Chối
                      </Button>
                    </div>
                  ) : detail?.status == "ACCEPT" ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenModal(detail?.id)}
                    >
                      Hủy tham gia trận đấu
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => requestJoin(postId)}
                      disabled={
                        listJoin?.length == post?.numberMember ||
                        detail?.status == "ACCEPT" ||
                        detail?.status == "NEW" ||
                        detail?.status == "CANCEL" ||
                        detail?.status == "NOACCEPT"
                      }
                    >
                      {detail?.status == "ACCEPT"
                        ? "Đã tham gia trận đấu"
                        : listJoin?.length == post?.numberMember
                        ? "Sẫn đã đủ người"
                        : detail?.status == "NEW"
                        ? "Đã yêu cầu tham gia trận đấu"
                        : detail?.status == "CANCEL"
                        ? "Hủy trận đấu"
                        : detail?.status == "NOACCEPT"
                        ? "Từ chối trận đấu"
                        : "Xin tham gia"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto mt-4">
          <Typography className="mt-2">
            Có {listJoin?.length} / {post?.numberMember} người chơi
          </Typography>
        </div>
        {isModal && (
          <ModalReason
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            open={isModal}
            onClose={handleCloseModal}
          />
        )}
        {isOwner && (
          <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto mt-4">
            <Typography className="mt-2">Danh sách người tham gia</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {listJoin?.map((item, index) => (
                    <TableRow key={item?.id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell
                        onClick={() => handleOpenDetail(item?.id)}
                        className="hover:underline hover:cursor-pointer"
                      >
                        {item?.userAvailability?.account?.user?.fullName}
                      </TableCell>
                      {!hasTimePassed(post?.booking?.startTime) && isOwner && (
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleOpenModalReason(item?.id)}
                          >
                            Loại người chơi
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
