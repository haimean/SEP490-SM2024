import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CallApi from "../../../../service/CallAPI.jsx";
import ChangePassword from "../../../../components/auth/ChangePassword.jsx";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { clearUser } from "../../../../middleware/redux/userSlice.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

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
    link: "/host/profile",
  },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.user);
  const [account, setAccount] = useState(null);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const getProfile = async () => {
    try {
      if (accountId) {
        const result = await CallApi(`/api/user/profile/${accountId}`);
        setAccount(result?.data);
      }
    } catch (error) {
      handleLogout();
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleLogout = () => {
    setOpen(null);
    dispatch(clearUser());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (link) => {
    setOpen(null);
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account?.user?.avatar}
          alt={account?.user?.fullName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account?.user?.fullName}
        </Avatar>
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account?.user?.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {account?.role === "HOST" &&
          MENU_OPTIONS_HOST.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleMenuItemClick(option.link)}
            >
              {option.label}
            </MenuItem>
          ))}
        {account?.role === "USER" &&
          MENU_OPTIONS_USER.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleMenuItemClick(option.link)}
            >
              {option.label}
            </MenuItem>
          ))}
        {account?.role === "ADMIN" && (
          <MenuItem onClick={() => setIsChangePassword(true)}>
            Đổi mật khẩu
          </MenuItem>
        )}
        {account?.role !== "ADMIN" && (
          <Divider sx={{ borderStyle: "dashed", m: 0 }} />
        )}

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Đăng xuất
        </MenuItem>
        {isChangePassword && (
          <ChangePassword
            open={isChangePassword}
            handleClose={() => setIsChangePassword(false)}
          />
        )}
      </Popover>
    </>
  );
}
