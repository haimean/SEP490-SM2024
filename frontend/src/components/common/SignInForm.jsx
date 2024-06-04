import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email and password
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleGoogleLogin = (credentialResponse) => {
    console.log('Google Login:', credentialResponse);
  };

  const handleFacebookLogin = (response) => {
    console.log('Facebook Login:', response);
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
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
          <label className="text-gray-500 block mt-3">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
          <button type="submit" className="mt-6 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg" >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
            Forgot password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log('Login Failed')}
          />
        </div>
        <div className="mt-4 text-center">
          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            autoLoad={false}
            fields="name,email,picture"
            onClick={handleFacebookLogin}
            cssClass="facebook-login-button"
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