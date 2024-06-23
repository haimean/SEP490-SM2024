import React from "react";
import SignInForm from "../../../components/auth/SignInForm.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import withAuthRedirect from "../../../utils/withAuthRedirect.jsx";
const Login = () => {
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SignInForm />
      </GoogleOAuthProvider>
    </div>
  );
};

export default withAuthRedirect(Login, "/");
