import React from 'react';
import SignInForm from '../../../components/common/SignInForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const Login = () => {
  return (
    <div>
       <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
       <SignInForm />
       </GoogleOAuthProvider>

    </div>
  );
};

export default Login;