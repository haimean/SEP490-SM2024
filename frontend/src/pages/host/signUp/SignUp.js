import React from 'react';
import SignUpForm from '../../../components/user/SignUpForm.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
const SignUpFormHost = () => {
  return (
    <div>
      <GoogleOAuthProvider
         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SignUpForm role="HOST"/>
      </GoogleOAuthProvider>

    </div>
  );
};

export default SignUpFormHost;