import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import InputLabel from '../common/InputLabel';
import CallApi from '../../services/CallApi';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({role}) => {
  const { register, handleSubmit, formState: { errors} } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
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

      const { email, name, picture } = decodedToken;

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
        const token = response.data.token;
        localStorage.setItem('accessToken', token);
        toast.success(`Login successful!`);
        navigate('/');

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
        <h1 className="font-bold text-center block text-2xl">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Name"
            id="name"
            register={register}
            errors={errors}
            required={true}
          />
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
          <InputLabel
            label="Password"
            id="password"
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
            label="Confirm Password"
            id="confirmPassword"
            register={register}
            errors={errors}
            required={true}
            type='password'
          />
          <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
            Sign Up
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
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
