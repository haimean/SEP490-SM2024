import React from 'react';
import SignUpForm from '../../../components/auth/SignUpForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import withAuthRedirect from '../../../utils/withAuthRedirect.jsx';
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

export default withAuthRedirect(SignUpFormHost, '/');