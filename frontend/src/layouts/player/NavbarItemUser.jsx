import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarItemUser = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
        to="/player/create-post"
        sx={{ textTransform: "none" }}
      >
        Đăng bài
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
