import ForgotPassword from "./pages/common/forgotPassword/ForgotPassword.js";
import Login from "./pages/common/login/Login.js";
import SignUpFormPlayer from "./pages/player/signUp/SignUp.js";
import ListAttributeBranch from "./pages/admin/AttributeBranch/ListAttributeBranch.js";
import CreateAttributeBranch from "./pages/admin/AttributeBranch/CreateAttributeBranch.js";
import DetailAttributeBranch from "./pages/admin/AttributeBranch/DetailAttributeBranch.js";
import UpdateAttributeBranch from "./pages/admin/AttributeBranch/UpdateAttributeBranch.js";
import ListAttributeCourt from "./pages/admin/AttributeCourt/ListAttributeCourt.js";
import DetailAttributeCourt from "./pages/admin/AttributeCourt/DetailAttributeCourt.js";
import CreateAttributeCourt from "./pages/admin/AttributeCourt/CreateAttributeCourt.js";
import UpdateAttributeCourt from "./pages/admin/AttributeCourt/UpdateAttributeCourt.js";

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
    path: "/forgot-password",
    name: "Forgot Password",
    component: <ForgotPassword />,
    role: "",
    layout: "",
  },
  {
    path: "/branch-attribute",
    name: "Branch Attribute",
    component: <ListAttributeBranch />,
    role: "admin",
    layout: "",
  },
  {
    path: "/detail-branch-attribute/:id",
    name: "Detail Branch Attribute",
    component: <DetailAttributeBranch />,
    role: "admin",
    layout: "",
  },
  {
    path: "/create-branch-attribute",
    name: "Create Branch Attribute",
    component: <CreateAttributeBranch />,
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
    path: "/court-attribute",
    name: "Court Attribute",
    component: <ListAttributeCourt />,
    role: "admin",
    layout: "",
  },
  {
    path: "/detail-court-attribute/:id",
    name: "Detail Court Attribute",
    component: <DetailAttributeCourt />,
    role: "admin",
    layout: "",
  },
  {
    path: "/create-court-attribute",
    name: "Create Court Attribute",
    component: <CreateAttributeCourt />,
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
];

export default routes;
