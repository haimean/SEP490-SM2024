import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CallApi from "../../service/CallAPI.jsx";
import { GoogleLogin } from "@react-oauth/google";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../middleware/redux/userSlice.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";

// eslint-disable-next-line react/prop-types
const SignUpForm = ({ role }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  let roleName;
  if (role === "HOST") {
    roleName = "Chủ Sân";
  } else {
    roleName = "Người Chơi";
  }

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword, numberPhone } = data;
    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không trùng khớp.");
      return;
    }
    setLoading(true);
    try {
      await CallApi(
        "/api/auth/register",
        "post",
        {
          email,
          name,
          password,
          role,
          numberPhone,
        },
        {}
      );
      toast.success(
        `Đăng kí thành công! Đã gửi mail xác nhận đến email của bạn. Vui lòng xác minh trước khi đăng nhập!`
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decodedToken = jwtDecode(credentialResponse.credential);

      // const { email, name, picture } = decodedToken;
      const { email, name } = decodedToken;
      try {
        const response = await CallApi(
          "/api/auth/login-google",
          "post",
          {
            email,
            name,
            role,
          },
          {}
        );
        const { token } = response.data;
        const accountId = response.data.id;
        const newRole = response.data.role;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userRole", newRole); // Lưu vai trò người dùng
        localStorage.setItem("accountId", accountId);
        dispatch(setUser({ user: email, role, accountId })); // Cập nhật thông tin người dùng vào Redux
        toast.success(`Login successful!`);
        switch (newRole) {
          case "HOST":
            navigate("/host");
            return;
          case "ADMIN":
            navigate("/admin/dashboard");
            return;
          case "USER":
            navigate("/");
            return;
        }
      } catch (error) {
        toast.error(error.response?.data?.error);
      }
    } else {
      console.log("No credential response");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google Login Failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="border-t-8 rounded-sm bg-white p-12 shadow-2xl w-96">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1 className="font-bold text-center block text-2xl mb-2">
        Đăng Kí Tài Khoản Cho {roleName}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Họ và tên"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name", { required: "Không được bỏ trống trường này." })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Không được bỏ trống trường này.",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Vui lòng nhập email hợp lệ.",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Số điện thoại"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          {...register("numberPhone", {
            required: "Không được bỏ trống trường này.",
            pattern: {
              value: /(84|0[3|5|7|8|9])+(\d{8})\b/,
              message: "Vui lòng nhập số điện thoại hợp lệ",
            },
          })}
          error={!!errors.numberPhone}
          helperText={errors.numberPhone?.message}
        />
        <TextField
          label="Mật Khẩu"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Không được bỏ trống trường này.",
            minLength: {
              value: 8,
              message: "Mật khẩu phải có nhiều hơn 8 kí tự.",
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
              message:
                "Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số, một kí tự đặc biệt và không được chứa khoảng trống.",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Nhập lại mật khẩu"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "Không được bỏ trống trường này.",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <RemoveRedEyeIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          type="submit"
          className="mt-6 transition block py-3 px-4 w-full"
        >
          Đăng kí
        </Button>
      </form>
      {role === "USER" && (
        <div className="mt-4 text-center flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginFailure}
            text="signup_with"
          />
        </div>
      )}

      <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-[#1976d2]">
          Đã có tài khoản? Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
