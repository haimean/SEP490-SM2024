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

const PostRightCP = ({ user, post, postId }) => {
  const [accountId, setAccountId] = useState(null);
  const [listJoin, setListJoin] = useState([]);
  const [openWaitingList, setOpenWaitingList] = useState(false);
  const [openRequestList, setOpenRequestList] = useState(false);

  const handleOpenWaitingList = () => setOpenWaitingList(true);
  const handleCloseWaitingList = () => setOpenWaitingList(false);

  const handleOpenRequestList = () => setOpenRequestList(true);
  const handleCloseRequestList = () => setOpenRequestList(false);
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
              >
                Gửi lời mời tham gia
              </Button>
            )}
          </div>
        </div>
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
                    <TableCell>{item?.account?.user?.fullName}</TableCell>
                    {isOwner && (
                      <TableCell>
                        <Button variant="contained" color="error">
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </Grid>
  );
};
export default PostRightCP;
