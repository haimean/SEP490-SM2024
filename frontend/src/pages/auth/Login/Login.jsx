import SignInForm from "../../../components/auth/SignInForm.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import WithAuthRedirect from "../../../utils/WithAuthRedirect.jsx";
const Login = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SignInForm />
    </GoogleOAuthProvider>
  );
};

export default WithAuthRedirect(Login, "/");
