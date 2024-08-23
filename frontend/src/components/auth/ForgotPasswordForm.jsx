/* eslint-disable react/prop-types */

import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import CallApi from "../../service/CallAPI.jsx";
import InputLabel from "../common/InputLabel.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

// EmailForm Component
const EmailForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <TextField
        label="Email"
        id="email"
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
      <Button
        disabled={isSubmitting}
        fullWidth
        type="submit"
        variant="contained"
      >
        Xác nhận
      </Button>
    </form>
  );
};

// OTPForm Component
const OTPForm = ({ onSubmit, otpTimer, otpExpired, handleResendOTP }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <TextField
        label="OTP"
        id="otp"
        fullWidth
        margin="normal"
        {...register("otp", {
          required: "Không được bỏ trống trường này.",
          minLength: {
            value: 6,
            message: "OTP phải có ít nhất 6 kí tự.",
          },
        })}
        error={!!errors.otp}
        helperText={errors.otp?.message}
      />
      <div className="mt-3 flex flex-col text-center">
        {otpExpired ? (
          <span>
            OTP <span className="text-red-600">expired</span>
          </span>
        ) : (
          <span>
            OTP hết hạn sau
            <span className="text-red-600"> {otpTimer} </span>
            giây
          </span>
        )}

        <Button variant="text" onClick={handleResendOTP}>
          Gửi lại OTP
        </Button>
      </div>
      <Button
        className="mt-6 transition block py-3 px-4 w-full "
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        type="submit"
      >
        Xác nhận OTP
      </Button>
    </form>
  );
};

// ResetPasswordForm Component
const ResetPasswordForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <InputLabel
        label="Nhập mật khẩu mới"
        id="newPassword"
        register={register}
        pattern={{
          value:
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          message:
            "Mật khẩu phải chứa ít nhất " +
            "một chữ viết hoa, một chữ viết thương, một số, một kí tự đặc biêt và không được chứa khoảng trống.",
        }}
        minLength={8}
        errors={errors}
        required="Không được bỏ trống trường này."
        type="password"
      />
      <InputLabel
        label="Nhập lại mật khẩu"
        id="confirmPassword"
        register={register}
        errors={errors}
        required="Không được bỏ trống trường này."
        type="password"
      />
      <Button type="submit" fullWidth variant="contained">
        Đặt lại mật khẩu
      </Button>
    </form>
  );
};

// ForgotPasswordForm Component
const ForgotPasswordForm = () => {
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showResetPasswordSection, setShowResetPasswordSection] =
    useState(false);
  const [otpTimer, setOTPTimer] = useState(120);
  const [otpExpired, setOtpExpired] = useState(false);
  const timerRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (data) => {
    const { email } = data;
    try {
      await CallApi("/api/auth/forgot-password", "post", { email }, {});
      toast.success(`OTP đã được gửi!`);
      setEmail(email);
      setShowOTPSection(true);
      startOTPTimer();
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleOTPSubmit = async (data) => {
    const { otp } = data;

    try {
      await CallApi(
        "/api/auth/forgot-password/verify-otp",
        "post",
        {
          email,
          otp,
        },
        {}
      );
      toast.success(`OTP verified!`);
      setShowOTPSection(false);
      setShowResetPasswordSection(true);
      clearInterval(timerRef.current);
    } catch (error) {
      toast.error(error.response?.data?.error.otp);
    }
  };

  const handleResendOTP = async () => {
    try {
      await CallApi("/api/auth/forgot-password", "post", { email }, {});
      toast.success(`OTP đã được gửi lại!`);
      setOtpExpired(false);
      setOTPTimer(120);
      clearInterval(timerRef.current);
      startOTPTimer();
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const startOTPTimer = () => {
    let timeLeft = 120;
    timerRef.current = setInterval(() => {
      timeLeft -= 1;
      setOTPTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerRef.current);
        setOtpExpired(true);
      }
    }, 1000);
  };

  const handleResetPasswordSubmit = async (data) => {
    const { newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không trùng khớp.");
      return;
    }
    try {
      await CallApi(
        "/api/auth/forgot-password/new-pass",
        "post",
        {
          email,
          password: newPassword,
        },
        {}
      );
      setShowOTPSection(false);
      setShowResetPasswordSection(false);
      setOTPTimer(120);
      clearInterval(timerRef.current);
      toast.success(`Đặt lại mật khẩu thành công!`);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="border-t-8 rounded-sm p-12 shadow-2xl w-96">
      <h1 className="font-bold text-center block text-2xl">Quên mật khẩu</h1>
      {!showOTPSection && !showResetPasswordSection && (
        <EmailForm onSubmit={handleSubmit} />
      )}
      {showOTPSection && (
        <OTPForm
          onSubmit={handleOTPSubmit}
          otpTimer={otpTimer}
          otpExpired={otpExpired}
          handleResendOTP={handleResendOTP}
        />
      )}
      {showResetPasswordSection && (
        <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />
      )}
      <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
      <div className="mt-4 text-center">
        <Link to="/login">Quay về đăng nhập</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
