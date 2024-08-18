/* eslint-disable react/prop-types */

import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CallApi from '../../service/CallAPI.jsx';
import { GoogleLogin } from '@react-oauth/google';
import PasswordInput from '../common/PasswordInput.jsx';
import VerifyAccountModal from '../auth/VerifyAccountModal.jsx';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../../middleware/redux/userSlice.jsx';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const SignInForm = ({ isModal, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const dispatch = useDispatch();

  const manageResponse = (response, email) => {
    const { token, role } = response.data;
    const accountId = response.data.id;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', role); // Lưu vai trò người dùng
    localStorage.setItem('accountId', accountId);
    dispatch(setUser({ user: email, role, accountId })); // Cập nhật thông tin người dùng vào Redux
    toast.success(`Đăng nhập thành công!`);
    if (!isModal) {
      // Kiểm tra nếu không phải modal thì mới chuyển hướng
      switch (role) {
        case 'HOST':
          navigate('/host/dashboard');
          return;
        // break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          return;
        case 'USER':
          console.log('chet mia');
          navigate('/');
          return;
      }
    } else {
      switch (role) {
        case 'HOST':
          navigate('/host/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          onSuccess();
      }
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await CallApi(
        '/api/auth/login',
        'post',
        {
          email,
          password,
        },
        {},
      );
      if (!response.data.isVerified) {
        setModalContent(
          'Tài khoản của bạn chưa được xác minh. Vui lòng kiểm tra email để xác minh tài khoản.',
        );
        setShowVerifyModal(true);
        return;
      }
      manageResponse(response, email);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log('Google Login:', decodedToken);
      const { email, name, picture } = decodedToken;
      console.log('Email:', email);
      console.log('Name:', name);
      console.log('Avatar:', picture);
      try {
        const response = await CallApi(
          '/api/auth/login-google',
          'post',
          {
            email,
            name,
            role: 'USER',
          },
          {},
        );
        manageResponse(response, email);
      } catch (error) {
        toast.error(error.response?.data?.error);
      }
    } else {
      console.log('No credential response');
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Đăng nhập bằng Google thất bại:', error);
    toast.error('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
  };

  const handleCloseModal = () => {
    setShowVerifyModal(false);
    setModalContent('');
  };

  return (
    <div>
      <div className="rounded-md bg-white p-12 pt-6 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 h-52">
          <TextField
            label="Email"
            id="email"
            fullWidth
            margin="normal"
            {...register('email', {
              required: 'Không được bỏ trống trường này.',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Vui lòng nhập email hợp lệ.',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <PasswordInput
            label="Mật khẩu"
            id="password"
            register={register}
            errors={errors}
            pattern={{
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
              message:
                'Mật khẩu ít nhất phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
            }}
            required="Không được bỏ trống trường này."
            type="password"
          />
          <div className="mt-2">
            <Button
              variant="contained"
              type="submit"
              className="mt-6 transition block py-3 px-4 w-full"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
        <div className="mt-1 text-center flex justify-end">
          <Link to="/forgot-password" className="text-[#1976d2]">
            Quên mật khẩu?
          </Link>
        </div>
        <div className="mt-4 text-center flex justify-center w-full">
          <GoogleLogin
            size="large"
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginFailure}
          />
        </div>
        <div className="mt-4 text-center">
          <Link to="/sign-up-player" className="text-[#1976d2]">
            Chưa có tài khoản? Đăng kí
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link to="/sign-up-host" className="text-[#1976d2]">
            Đăng ký tài khoản cho chủ sân
          </Link>
        </div>
      </div>
      <VerifyAccountModal show={showVerifyModal} onClose={handleCloseModal}>
        {modalContent}
      </VerifyAccountModal>
      <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SignInForm;
