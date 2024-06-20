import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import InputLabel from "../common/InputLabel";
import CallApi from '../../services/CallApi';
import { toast } from "react-toastify";

// EmailForm Component
const EmailForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
      <InputLabel
        label="Email"
        id="email"
        register={register}
        pattern={{
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Vui lòng nhập email hợp lệ."
        }}
        errors={errors}
        required="Không được bỏ trống trường này."
      />
      <button disabled={isSubmitting} type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        Kiểm tra email
      </button>
    </form>
  );
};

// OTPForm Component
const OTPForm = ({ onSubmit, otpTimer, otpExpired, handleResendOTP }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
      <InputLabel
        label="OTP"
        id="otp"
        register={register}
        errors={errors}
        required="Không được bỏ trống trường này."
        minLength={6}
      />
      <div className="mt-3 flex flex-col text-center">
        {otpExpired ? (
          <span>OTP <span className="text-red-600">expired</span></span>
        ) : (
          <span>
            OTP hết hạn sau
            <span className="text-red-600"> {otpTimer} </span>
            giây
          </span>
        )}
        <button
          type="button"
          // className="text-indigo-600 hover:text-indigo-800"
          className="text-black underline mt-2 hover:text-indigo-800"
          onClick={handleResendOTP}
        >
          Gửi lại OTP
        </button>
      </div>
      <button disabled={isSubmitting} type="submit"
        className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        Xác nhận OTP
      </button>
    </form>
  );
};

// ResetPasswordForm Component
const ResetPasswordForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
      <InputLabel
        label="Nhập mật khẩu mới"
        id="newPassword"
        register={register}
        pattern={{
          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          message: "Mật khẩu phải chứa ít nhất " +
                "một chữ viết hoa, một chữ viết thương, một số, một kí tự đặc biêt và không được chứa khoảng trống."
        }}
        minLength={8}
        errors={errors}
        required="Không được bỏ trống trường này."
        type='password'
      />
      <InputLabel
        label="Nhập lại mật khẩu"
        id="confirmPassword"
        register={register}
        errors={errors}
        required="Không được bỏ trống trường này."
        type='password'
      />
      <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        Đặt lại mật khẩu
      </button>
    </form>
  );
};

// ForgotPasswordForm Component
const ForgotPasswordForm = () => {
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showResetPasswordSection, setShowResetPasswordSection] = useState(false);
  const [otpTimer, setOTPTimer] = useState(120);
  const [otpExpired, setOtpExpired] = useState(false);
  const timerRef = useRef(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (data) => {
    const { email } = data;
    try {
       await CallApi(
        '/api/auth/forgot-password',
        'post',
        { email },
        {}
      );
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
        '/api/auth/forgot-password/verify-otp',
        'post',
        {
          email,
          otp
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
       await CallApi(
        '/api/auth/forgot-password',
        'post',
        { email },
        {}
      );
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
      toast.error('Mật khẩu nhập lại không trùng khớp.');
      return;
    }
    try {
       await CallApi(
        '/api/auth/forgot-password/new-pass',
        'post',
        {
          email,
          password: newPassword
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
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
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
          <a href="/login" className="text-indigo-600 hover:text-indigo-800">
            Quay về đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
