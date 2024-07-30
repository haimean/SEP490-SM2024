import { useState } from "react";
import { keyframes } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../middleware/redux/userSlice.jsx";
import AccountPopover from "../admin/dashboard/common/account-popover";
import LoginModal from "../../components/auth/LoginModal";
import NavbarItemHost from "../host/NavbarItemHost.jsx";
import NavbarItemUser from "./NavbarItemUser.jsx";
import NavbarItemAdmin from "../admin/NavbarItemAdmin.jsx";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const role = localStorage.getItem("userRole");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const gentleShakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   navigate(event.target.value);
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={openLoginModal}>
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "block" },
              marginRight: 2,
              cursor: "pointer",
              "&:hover": {
                animation: `${gentleShakeAnimation} 0.5s ease-in-out`,
              },
            }}
          >
            Court Connect
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {role === "HOST" && <NavbarItemHost />}
          {role === "USER" && <NavbarItemUser />}
          {role === "ADMIN" && <NavbarItemAdmin />}


          <Box sx={{ display: { xs: "none", md: "flex" }, ml: "20px" }}>
            {user ? (
              <AccountPopover />
            ) : (
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
                  to="/list-blog"
                  sx={{ textTransform: "none" }}
                >
                  Bài đăng
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/available-post"
                  sx={{ textTransform: "none" }}
                >
                  Trận đấu đang tìm người
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/search-courts"
                  sx={{ textTransform: "none", marginRight: "2px" }}
                >
                  Tìm sân đấu
                </Button>
                <Button
                  onClick={openLoginModal}
                  sx={{
                    backgroundColor: "white",
                    color: "green",
                    fontWeight: "bold",
                    "&:hover": {
                      color: "white",
                    },
                    textTransform: "none",
                    padding: "6px 16px",
                    borderRadius: "10px",
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "20px" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LoginModal open={loginModalOpen} onClose={closeLoginModal} />
    </Box>
  );
}
