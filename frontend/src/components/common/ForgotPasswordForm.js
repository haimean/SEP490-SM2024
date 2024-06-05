import React, { useState, useEffect, useRef } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showResetPasswordSection, setShowResetPasswordSection] = useState(false);
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpTimer, setOTPTimer] = useState(30);
  const [otpResent, setOtpResent] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const timerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setError('')
    // Implement your forgot password logic here
    console.log('Email:', email);
    // Show the OTP section
    setShowOTPSection(true);
    // Start the OTP timer
    startOTPTimer();
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Validate OTP
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    // Implement your OTP verification logic here
    if (otp === '123456') { // Giả sử 123456 là OTP hợp lệ
      console.log('OTP:', otp);
      setShowOTPSection(false);
      setShowResetPasswordSection(true);
      setError('');
      clearInterval(timerRef.current);
    } else {
      setError('Invalid OTP.');
    }
  };

  const handleResendOTP = () => {
    // Implement your logic to resend the OTP
    console.log('Resending OTP...');
    setOtpResent(true);
    setOtpExpired(false);
    setOTPTimer(30);
    clearInterval(timerRef.current);
    startOTPTimer();
  };

  const startOTPTimer = () => {
    let timeLeft = 30;
    timerRef.current = setInterval(() => {
      timeLeft -= 1;
      setOTPTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerRef.current);
        setOtpExpired(true);
      }
    }, 1000);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    // Validate passwords
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Implement your password reset logic here
    console.log('New Password:', newPassword);
    // Reset the form
    setEmail('');
    setOTP('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setShowOTPSection(false);
    setShowResetPasswordSection(false);
    setOTPTimer(30);
    setOtpResent(false);
    setOtpExpired(false);
    clearInterval(timerRef.current);
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
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {!showOTPSection && !showResetPasswordSection && (
          <form onSubmit={handleSubmit}>
            <label className="text-gray-500 block mt-3">
              Email Address
              <input
                type="email"
                id="email"
                name="email"
                placeholder="me@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
              />
            </label>
            <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
              Reset Password
            </button>
          </form>
        )}
        {showOTPSection && (
          <form onSubmit={handleOTPSubmit}>
            <label className="text-gray-500 block mt-3">
              OTP
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
              />
            </label>
            <div className="mt-3 flex flex-col text-center">
              {otpExpired ? (
                <span>OTP expired</span>
              ) : (
                <span>OTP expires in {otpTimer} seconds</span>
              )}
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-800"
                onClick={handleResendOTP}
              >
                Resend OTP
              </button>
              {otpResent && (
                <div className="text-green-500 mt-2">OTP has been resent.</div>
              )}
            </div>
            <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
              Verify OTP
            </button>
          </form>
        )}
        {showResetPasswordSection && (
          <form onSubmit={handleResetPasswordSubmit}>
            <label className="text-gray-500 block mt-3">
              New Password
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
              />
            </label>
            <label className="text-gray-500 block mt-3">
              Confirm New Password
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
              />
            </label>
            <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
              Reset Password
            </button>
          </form>
        )}
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
