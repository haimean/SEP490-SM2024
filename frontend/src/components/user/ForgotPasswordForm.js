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
        label="Email Address"
        id="email"
        register={register}
        pattern={{
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Please enter a valid email"
        }}
        errors={errors}
        required="Email is required"
      />
      <button disabled={isSubmitting} type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        Reset Password
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
        required={true}
        minLength={6}
      />
      <div className="mt-3 flex flex-col text-center">
        {otpExpired ? (
          <span>OTP <span className="text-red-600">expired</span></span>
        ) : (
          <span>
            OTP expires in
            <span className="text-red-600"> {otpTimer} </span>
            seconds
          </span>
        )}
        <button
          type="button"
          // className="text-indigo-600 hover:text-indigo-800"
          className="text-black underline mt-2 hover:text-indigo-800"
          onClick={handleResendOTP}
        >
          Resend OTP
        </button>
      </div>
      <button disabled={isSubmitting} type="submit"
        className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        Verify OTP
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
        label="New Password"
        id="newPassword"
        register={register}
        pattern={{
          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          message: "Password must at least contains " +
            "one uppercase letter, one lowercase letter, one number and one special character:"
        }}
        minLength={8}
        errors={errors}
        required={true}
        type='password'
      />
      <InputLabel
        label="Confirm New Password"
        id="confirmPassword"
        register={register}
        errors={errors}
        required={true}
        type='password'
      />
      <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        Reset Password
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
  const [error, setError] = useState('');
  const timerRef = useRef(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (data) => {
    const { email } = data;
    try {
      const response = await CallApi(
        '/api/auth/forgot-password',
        'post',
        { email },
        {}
      );
      toast.success(`OTP send successful!`);
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
      const response = await CallApi(
        '/api/auth/forgot-password/verify-otp',
        'post',
        {
          email,
          otp
        },
        {}
      );
      toast.success(`OTP verified!`);
      console.log('OTP:', otp);
      setShowOTPSection(false);
      setShowResetPasswordSection(true);
      clearInterval(timerRef.current);
    } catch (error) {
      toast.error(error.response?.data?.error.otp);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await CallApi(
        '/api/auth/forgot-password',
        'post',
        { email },
        {}
      );
      toast.success(`OTP send successful!`);
      console.log('Resending OTP...');
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
    if (!newPassword || !confirmPassword) {
      toast.error(error.response?.data?.error);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    console.log(email, newPassword);
    try {
      const response = await CallApi(
        '/api/auth/forgot-password/new-pass',
        'post',
        {
          email,
          password: newPassword
        },
        {}
      );
      console.log('New Password:', newPassword);
      setShowOTPSection(false);
      setShowResetPasswordSection(false);
      setOTPTimer(120);
      clearInterval(timerRef.current);
      toast.success(`Password reset successful!`);
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
        <h1 className="font-bold text-center block text-2xl">Forgot Password</h1>
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
        <style jsx>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
        <div className="mt-4 text-center">
          <a href="/login" className="text-indigo-600 hover:text-indigo-800">
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
