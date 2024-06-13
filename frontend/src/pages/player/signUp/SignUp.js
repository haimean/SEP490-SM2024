import React from 'react';
import SignUpForm from '../../../components/user/SignUpForm.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
const SignUpFormPlayer = () => {
  return (
    <div>
      <GoogleOAuthProvider
         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SignUpForm role="USER"/>
      </GoogleOAuthProvider>

    </div>
  );
};

export default SignUpFormPlayer;