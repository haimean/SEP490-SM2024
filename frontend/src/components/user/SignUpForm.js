import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import InputLabel from '../common/InputLabel';
import CallApi from '../../services/CallApi';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice.js';

const SignUpForm = ({ role }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error('Mật khẩu nhập lại không trùng khớp.');
      return;
    }
    try {
      await CallApi(
        '/api/auth/register',
        'post',
        {
          email,
          name,
          password,
          role
        },
        {}
      );
      toast.success(`Đăng kí thành công! Đã gửi mail xác nhận đến email của bạn. Vui lòng xác minh trước khi đăng nhập!`);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decodedToken = jwtDecode(credentialResponse.credential);

      // const { email, name, picture } = decodedToken;
      const { email, name } = decodedToken;
      try {
        const response = await CallApi(
          '/api/auth/login-google',
          'post',
          {
            email,
            name,
            role,
          },
          {}
        );
        const { token } = response.data;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userRole', role); // Lưu vai trò người dùng
        dispatch(setUser({ user: email, role })); // Cập nhật thông tin người dùng vào Redux
        toast.success(`Login successful!`);
        if (role === 'HOST') {
          navigate('/');
        }
        else if (role === 'USER') {
          navigate('/');
        }
      } catch (error) {
        toast.error(error.response?.data?.error);
      }
    } else {
      console.log('No credential response');
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failed:', error);
    toast.error('Google login failed. Please try again.');
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl mb-2">Đăng Kí</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Tên"
            id="name"
            register={register}
            errors={errors}
            required="Không được bỏ trống trường này."
          />
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
          <InputLabel
            label="Mật Khẩu"
            id="password"
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
            Đăng kí
          </button>
        </form>
        <div className="mt-4 text-center flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginFailure}
            text='signup_with'
          />
        </div>
        <style>{`
        ::-ms-reveal {
          display: none;
        }
      `}</style>
        <div className="mt-4 text-center">
          <a href="/login" className="text-indigo-600 hover:text-indigo-800">
            Đã có tài khoản? Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
