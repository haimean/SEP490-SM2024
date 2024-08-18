import { Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AccountPopover from "../admin/dashboard/common/account-popover.jsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CallApi from "../../service/CallAPI.jsx";
import IconButton from "@mui/material/IconButton";
import LoginModal from "../../components/auth/LoginModal.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import NavbarItemUser from "./NavbarItemUser.jsx";
import Notification from "../Notification.jsx";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { clearUser } from "../../middleware/redux/userSlice.jsx";
import { keyframes } from "@mui/system";

const MENU_OPTIONS_USER = [
  {
    label: "Thông tin cá nhân",
    link: "/profile",
  },
  {
    label: "Lịch sử đặt sân",
    link: "/player/booking-history",
  },
  {
    label: "Lịch sử xin vào trận",
    link: "/request-list-join",
  },
];
const MENU_OPTIONS_HOST = [
  {
    label: "Thông tin cá nhân",
    link: "/profile",
  },
];

export default function NavbarUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { accountId } = useSelector((state) => state.user);
  const [account, setAccount] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const getProfile = async () => {
    try {
      const result = await CallApi(`/api/user/profile/${accountId}`);
      setAccount(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const gentleShakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

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
    console.log("chet mia");

    navigate("/");
  };
  const handleMenuItemClick = (link) => {
    navigate(link);
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

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
      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
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
        account?.role === "HOST" ? (
          <>
            {MENU_OPTIONS_HOST.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleMenuItemClick(option.link)}
              >
                {option.label}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </>
        ) : (
          <>
            {MENU_OPTIONS_USER.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleMenuItemClick(option.link)}
              >
                {option.label}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </>
        )
      ) : (
        <MenuItem onClick={openLoginModal}>
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  );
  //sx={{ flexGrow: 1 }} nếu cần cho vào box
  return (
    <Box>
      <AppBar position="fixed">
        <Container>
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
            <NavbarItemUser />
            <Box sx={{ flexGrow: 1 }} />
            {/* notification and login */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: "20px" }}>
              {user ? (
                <div>
                  <Notification />
                  <AccountPopover />
                </div>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
            {/* for mobile */}
            <Box
              sx={{
                display: { xs: "flex", md: "none", alignItems: "center" },
                ml: "20px",
              }}
            >
              <Notification />

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
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LoginModal open={loginModalOpen} onClose={closeLoginModal} />
    </Box>
  );
}
