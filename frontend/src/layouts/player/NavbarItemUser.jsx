import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
const NavbarItemUser = () => {
  const [isNotification, setIsNotification] = useState(false);
  const changeNotification = () => {
    setIsNotification(!isNotification);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        color="inherit"
        component={Link}
        sx={{ textTransform: "none" }}
        onClick={changeNotification}
      >
        <NotificationsIcon />
      </Button>
      {isNotification && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "fixed",
            top: "50px", // Đặt vị trí từ trên cùng (có thể thay đổi tùy ý)
            right: "12%", // Đặt vị trí từ bên phải (có thể thay đổi tùy ý)
            zIndex: 1000, // Đảm bảo danh sách nổi trên các phần tử khác
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Thêm bóng để làm nổi bật
            borderRadius: "8px", // Thêm bo tròn các góc
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Photos"
              secondary="Jan 9, 2014"
              className="text-black"
            />
          </ListItem>
          <div className="flex justify-around">
            <Button variant="contained" color="success">
              Chấp nhận
            </Button>
            <Button variant="contained" color="error">
              Từ chối
            </Button>
          </div>
        </List>
      )}
      <Button
        color="inherit"
        component={Link}
        to="/"
        sx={{ textTransform: "none" }}
      >
        Trang chủ
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/list-blog"
        sx={{ textTransform: "none" }}
      >
        Bài đăng
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/search-courts"
        sx={{ textTransform: "none" }}
      >
        Tìm sân đấu
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/player/booking-history"
        sx={{ textTransform: "none" }}
      >
        Lịch sử đặt sân
      </Button>
    </Box>
  );
};

export default NavbarItemUser;
