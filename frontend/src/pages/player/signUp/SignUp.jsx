import React from 'react';
import SignUpForm from '../../../components/player/SignUpForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const SignUpFormPlayer = () => {
  return (
    <div>
       <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
       <SignUpForm />
       </GoogleOAuthProvider>

    </div>
  );
};

export default SignUpFormPlayer;