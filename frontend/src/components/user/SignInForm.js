import React, { } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import InputLabel from "../common/InputLabel";
import { toast } from "react-toastify";
import CallApi from '../../services/CallApi';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await CallApi(
        '/api/auth/login',
        'post',
        {
          email,
          password
        },
        {}
      );
      const token = response.data.token;
      localStorage.setItem('accessToken', token);
      toast.success(`Login successful!`);
      navigate('/');
      console.log(response.data.token);
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
            role: "USER",
          },
          {}
        );
        const token = response.data.token;
        localStorage.setItem('accessToken', token);
        toast.success(`Login successful!`);
        navigate('/');
        console.log(response.data.token);
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
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            errors={errors}
            required={true}
            type="password"
          />
          <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
            Forgot password?
          </a>
        </div>
        <div className="mt-4 text-center flex justify-center w-full">
          <GoogleLogin
            size='large'
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginFailure}
          />
        </div>
        <div className="mt-4 text-center">
          <a href="/sign-up-player" className="text-indigo-600 hover:text-indigo-800">
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
