import React from "react";
import SignInForm from "../../../components/auth/SignInForm.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import withAuthRedirect from "../../../utils/withAuthRedirect.jsx";
const Login = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SignInForm />
    </GoogleOAuthProvider>
  );
};

export default withAuthRedirect(Login, "/");
