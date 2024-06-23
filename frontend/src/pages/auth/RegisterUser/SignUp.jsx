import React from 'react';
import SignUpForm from '../../../components/auth/SignUpForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import withAuthRedirect from '../../../utils/withAuthRedirect.jsx';
const SignUpFormPlayer = () => {
  return (
    <div>
      <GoogleOAuthProvider
         clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SignUpForm role="USER"/>
      </GoogleOAuthProvider>

    </div>
  );
};

export default withAuthRedirect(SignUpFormPlayer, '/');