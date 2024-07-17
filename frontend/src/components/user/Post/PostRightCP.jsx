import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper, Button, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WaitingListTable from "../../../components/user/WaitingList/WaitingListTable.jsx";
import RequestListTable from "../../../components/user/ResponseToRequest/RequestListTable.jsx";

const PostRightCP = ({ user, isOwner }) => {
  const [openWaitingList, setOpenWaitingList] = useState(false);
  const [openRequestList, setOpenRequestList] = useState(false);

  const handleOpenWaitingList = () => setOpenWaitingList(true);
  const handleCloseWaitingList = () => setOpenWaitingList(false);

  const handleOpenRequestList = () => setOpenRequestList(true);
  const handleCloseRequestList = () => setOpenRequestList(false);

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Người đăng
        </Typography>
        <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto">
          <div className="flex justify-center mb-4">
            <Avatar alt={user.name} src={user.avatarUrl} className="w-24 h-24" />
          </div>
          <Typography variant="h6" align="center" className="mt-2">
            {user.name}
          </Typography>
          <Typography variant="body1" align="center" className="text-gray-600">
            {user.level}
          </Typography>
          <div className="flex items-center justify-center mt-2">
            <StarIcon className="text-yellow-300" />
            <span className="ml-1 text-gray-600">{user.friendliness}</span>
          </div>
          <Typography variant="body1" align="center" className="text-gray-600 mt-2">
            Liên hệ: {user.numberPhone}
          </Typography>
          <div className="mt-4 flex justify-center space-x-2">
            {!isOwner ? (
              <>
                <Button variant="contained"
                  onClick={handleOpenWaitingList}>Mời người chơi</Button>
                <WaitingListTable open={openWaitingList} onClose={handleCloseWaitingList} />
                <Button variant="contained"
                  onClick={handleOpenRequestList}>Xem danh sách chờ</Button>
                <RequestListTable open={openRequestList} onClose={handleCloseRequestList} />
              </>
            ) : (
              <Button variant="contained" color="primary">
                Gửi lời mời tham gia
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default PostRightCP;
