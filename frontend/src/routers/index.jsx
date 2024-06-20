import ForgotPassword from "../pages/common/forgotPassword/ForgotPassword.js";
import Login from "../pages/auth/Login/Login.jsx";
import SignUpFormPlayer from "../pages/player/signUp/SignUp.js";
import SignUpFormHost from "../pages/host/signUp/SignUp.js";
import ListAttributeBranch from "../pages/admin/AttributeBranch/ListAttributeBranch.js";
import DetailAttributeBranch from "../pages/admin/AttributeBranch/DetailAttributeBranch.js";
import ListAttributeCourt from "./pages/admin/AttributeCourt/ListAttributeCourt.js";
import DetailAttributeCourt from "../pages/admin/AttributeCourt/DetailAttributeCourt.js";
import LandingPage from "../pages/common/LandingPage.jsx";
import Profile from "../pages/common/profile/Profile.js";
import Test from "../pages/test/Test.js";
import ChangePasswordPage from "../pages/common/changePassword/ChangePasswordPage.js";
import ListAccount from "../pages/admin/listAccount/ListAccount.js";
import NotFound from "../pages/common/NotFound/NotFound.js";

const routes = [
  {
    path: "/",
    name: "Landing Page",
    component: <LandingPage />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/profile",
    name: "Profile",
    component: <Profile />,
    role: ["USER", "HOST", "ADMIN"], // Cho phép cả USER, HOST và ADMIN truy cập
    layout: "",
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/sign-up-player",
    name: "Sign Up Player",
    component: <SignUpFormPlayer />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/sign-up-host",
    name: "Sign Up Host",
    component: <SignUpFormHost />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: <ForgotPassword />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/admin/branch-attribute",
    name: "Branch Attribute",
    component: <ListAttributeBranch />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "",
  },
  {
    path: "/admin/detail-branch-attribute/:id",
    name: "Detail Branch Attribute",
    component: <DetailAttributeBranch />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "",
  },
  {
    path: "/admin/court-attribute",
    name: "Court Attribute",
    component: <ListAttributeCourt />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "",
  },
  {
    path: "/admin/detail-court-attribute/:id",
    name: "Detail Court Attribute",
    component: <DetailAttributeCourt />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "",
  },
  {
    path: "/test",
    name: "Test",
    component: <Test />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: <ChangePasswordPage />,
    role: ["USER", "HOST", "ADMIN"], // Cho phép cả USER, HOST và ADMIN truy cập
    layout: "",
  },
  {
    path: "/admin/list-account",
    name: "List Account",
    component: <ListAccount />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "",
  },
  {
    path: "/404",
    name: "Not Found",
    component: <NotFound />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
];

export default routes;
