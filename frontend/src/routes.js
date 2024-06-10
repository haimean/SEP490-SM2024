import ForgotPassword from "./pages/common/forgotPassword/ForgotPassword.js";
import Login from "./pages/common/login/Login.js";
import SignUpFormPlayer from "./pages/player/signUp/SignUp.js";
import SignUpFormHost from "./pages/host/signUp/SignUp.js";
import ListAttributeBranch from "./pages/admin/AttributeBranch/ListAttributeBranch.js";
import DetailAttributeBranch from "./pages/admin/AttributeBranch/DetailAttributeBranch.js";
import UpdateAttributeBranch from "./pages/admin/AttributeBranch/UpdateAttributeBranch.js";
import ListAttributeCourt from "./pages/admin/AttributeCourt/ListAttributeCourt.js";
import DetailAttributeCourt from "./pages/admin/AttributeCourt/DetailAttributeCourt.js";
import UpdateAttributeCourt from "./pages/admin/AttributeCourt/UpdateAttributeCourt.js";
import Test from "./pages/test/Test.js";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    role: "",
    layout: "",
  },
  {
    path: "/sign-up-player",
    name: "Sign Up Player",
    component: <SignUpFormPlayer />,
    role: "player",
    layout: "",
  },
  {
    path: "/sign-up-host",
    name: "Sign Up Host",
    component: <SignUpFormHost />,
    role: "host",
    layout: "",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: <ForgotPassword />,
    role: "",
    layout: "",
  },
  {
    path: "/admin/branch-attribute",
    name: "Branch Attribute",
    component: <ListAttributeBranch />,
    role: "admin",
    layout: "",
  },
  {
    path: "/admin/detail-branch-attribute/:id",
    name: "Detail Branch Attribute",
    component: <DetailAttributeBranch />,
    role: "admin",
    layout: "",
  },
  {
    path: "/update-branch-attribute",
    name: "Update Branch Attribute",
    component: <UpdateAttributeBranch />,
    role: "admin",
    layout: "",
  },
  {
    path: "/admin/court-attribute",
    name: "Court Attribute",
    component: <ListAttributeCourt />,
    role: "admin",
    layout: "",
  },
  {
    path: "/admin/detail-court-attribute/:id",
    name: "Detail Court Attribute",
    component: <DetailAttributeCourt />,
    role: "admin",
    layout: "",
  },
  {
    path: "/update-court-attribute",
    name: "Update Court Attribute",
    component: <UpdateAttributeCourt />,
    role: "admin",
    layout: "",
  },
  {
    path: "/test",
    name: "Test",
    component: <Test />,
    role: "",
    layout: "",
  },
];

export default routes;
