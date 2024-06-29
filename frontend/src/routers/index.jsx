import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword.jsx";
import Login from "../pages/auth/Login/Login.jsx";
import SignUpFormPlayer from "../pages/auth/RegisterUser/SignUp.jsx";
import SignUpFormHost from "../pages/auth/RegisterHost/SignUp.jsx";
import ListAttributeBranch from "../pages/admin/AttributeBranch/ListAttributeBranch.jsx";
import DetailAttributeBranch from "../pages/admin/AttributeBranch/DetailAttributeBranch.jsx";
import ListAttributeCourt from "../pages/admin/AttributeCourt/ListAttributeCourt.jsx";
import DetailAttributeCourt from "../pages/admin/AttributeCourt/DetailAttributeCourt.jsx";
import LandingPage from "../pages/common/LandingPage.jsx";
import Profile from "../pages/common/Profile.jsx";
import ChangePasswordPage from "../pages/auth/changePassword/ChangePasswordPage.jsx";
import ListAccount from "../pages/admin/ListAccount/ListAccount.jsx";
import NotFound from "../pages/common/NotFound/NotFound.jsx";
import Dashboard from "../pages/admin/Dashboard/Dashboard.jsx";
import ListBranch from "../pages/host/Branch/ListBranch.jsx";
import BranchDetail from "../pages/host/Branch/BranchDetail.jsx";

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
    path: "/admin/dashboard",
    name: "Dashboard",
    component: <Dashboard />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "",
  },
  {
    path: "/host/list-branch",
    name: "List Branch",
    component: <ListBranch />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/host/branch/:id",
    name: "Branch Detail",
    component: <BranchDetail />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  // {
  //   path: "/host/branch-list",
  //   name: "Branch List",
  //   component: <BranchList />,
  //   // role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
  //   layout: "",
  // },
  {
    path: "/host/branch-detail",
    name: "Branch Detail",
    component: <BranchDetail />,
    // role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
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
