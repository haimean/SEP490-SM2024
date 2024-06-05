import React from 'react';
import SignUpForm from '../../../components/player/SignUpForm.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
const SignUpFormPlayer = () => {
  return (
    <div>
      <GoogleOAuthProvider
        clientId="886827014286-uueubia01arg46h6h6ua0ve061g3dl7e.apps.googleusercontent.com">
        <SignUpForm />
      </GoogleOAuthProvider>

    </div>
  );
};

export default SignUpFormPlayer;