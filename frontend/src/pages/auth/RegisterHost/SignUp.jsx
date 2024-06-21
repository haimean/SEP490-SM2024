import React from 'react';
import SignUpForm from '../../../components/auth/SignUpForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import withAuthRedirect from '../../../utils/withAuthRedirect.jsx';
const SignUpFormHost = () => {
  return (
    <div>
      <GoogleOAuthProvider
         clientId="886827014286-uueubia01arg46h6h6ua0ve061g3dl7e.apps.googleusercontent.com">
        <SignUpForm role="HOST"/>
      </GoogleOAuthProvider>

    </div>
  );
};

export default withAuthRedirect(SignUpFormHost, '/');