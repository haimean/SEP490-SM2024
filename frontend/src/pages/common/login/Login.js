import React from 'react';
import SignInForm from '../../../components/user/SignInForm.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import withAuthRedirect from '../../../utils/withAuthRedirect.js';
const Login = () => {
  return (
    <div>
      <GoogleOAuthProvider
         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SignInForm />
      </GoogleOAuthProvider>

    </div>
  );
};

export default withAuthRedirect(Login, '/');