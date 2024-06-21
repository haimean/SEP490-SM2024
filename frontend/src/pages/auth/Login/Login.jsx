import React from "react";
import SignInForm from "../../../components/auth/SignInForm.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import withAuthRedirect from "../../../utils/withAuthRedirect.jsx";
const Login = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId="886827014286-uueubia01arg46h6h6ua0ve061g3dl7e.apps.googleusercontent.com">
        <SignInForm />
      </GoogleOAuthProvider>
    </div>
  );
};

export default withAuthRedirect(Login, "/");
