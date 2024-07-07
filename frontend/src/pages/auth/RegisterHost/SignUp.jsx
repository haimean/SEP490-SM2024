import React from 'react';
import SignUpForm from '../../../components/auth/SignUpForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import WithAuthRedirect from '../../../utils/WithAuthRedirect.jsx';
const SignUpFormHost = () => {
  return (
    <div>
      <GoogleOAuthProvider
         clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SignUpForm role="HOST"/>
      </GoogleOAuthProvider>

    </div>
  );
};

export default WithAuthRedirect(SignUpFormHost, '/');